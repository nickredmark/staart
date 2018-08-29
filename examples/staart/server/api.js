const { MongoClient, ObjectId } = require("mongodb");
const bodyParser = require("body-parser");
const session = require("express-session");
const { graphqlExpress, graphiqlExpress } = require("graphql-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const morgan = require("morgan");
const cors = require("cors");
const ooth = require("./ooth");

const prepare = o => {
  if (o && o._id) {
    o._id = o._id.toString();
  }
  return o;
};

const start = async (app, settings) => {
  let db;
  try {
    db = await MongoClient.connect(settings.mongoUrl);

    const Posts = db.collection("posts");
    const Comments = db.collection("comments");

    const typeDefs = [
      `
            type Query {
                me: User
                post(_id: ID!): Post
                posts: [Post]
                comment(_id: ID!): Comment
            }
            type User {
                _id: ID!
            }
            type Post {
                _id: ID!
                authorId: ID!
                title: String
                content: String

                author: User
                comments: [Comment]!
            }
            type Comment {
                _id: ID!
                postId: ID!
                authorId: ID
                content: String

                author: User
                post: Post
            }
            type Mutation {
                createPost(title: String, content: String): Post
                createComment(postId: ID!, content: String): Comment
            }
            schema {
                query: Query
                mutation: Mutation
            }
        `
    ];

    const resolvers = {
      Query: {
        me: async (root, args, { userId }) => {
          if (!userId) {
            return null;
          }
          return {
            _id: userId
          };
        },
        post: async (root, { _id }) => {
          return prepare(await Posts.findOne(ObjectId(_id)));
        },
        posts: async (root, args, context) => {
          return (await Posts.find(
            {},
            { sort: { createdAt: -1 } }
          ).toArray()).map(prepare);
        },
        comment: async (root, { _id }) => {
          return prepare(await Comments.findOne(ObjectId(_id)));
        }
      },
      Post: {
        comments: async ({ _id }) => {
          return (await Comments.find(
            { postId: _id },
            { sort: { createdAt: 1 } }
          ).toArray()).map(prepare);
        }
      },
      Comment: {
        post: async ({ postId }) => {
          return prepare(await Posts.findOne(ObjectId(postId)));
        }
      },
      Mutation: {
        createPost: async (root, args, { userId }, info) => {
          if (!userId) {
            throw new Error("User not logged in.");
          }
          args.authorId = userId;
          args.createdAt = new Date();
          const _id = (await Posts.insertOne(args)).insertedId;
          return prepare(await Posts.findOne(ObjectId(_id)));
        },
        createComment: async (root, args, { userId }) => {
          if (!userId) {
            throw new Error("User not logged in.");
          }
          args.authorId = userId;
          args.createdAt = new Date();
          const _id = (await Comments.insertOne(args)).insertedId;
          return prepare(await Comments.findOne(ObjectId(_id)));
        }
      }
    };

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers
    });

    app.use(morgan("dev"));

    const corsMiddleware = cors({
      origin: settings.originUrl,
      credentials: true,
      preflightContinue: false
    });
    app.use(corsMiddleware);
    app.options(corsMiddleware);

    await ooth(app, settings);

    app.use(
      "/graphql",
      bodyParser.json(),
      graphqlExpress((req, res) => {
        return {
          schema,
          context: { userId: req.user }
        };
      })
    );

    app.use(
      "/graphiql",
      graphiqlExpress({
        endpointURL: "/graphql"
      })
    );
  } catch (e) {
    if (db) {
      db.close();
    }
    throw e;
  }
};

module.exports = {
  start
};
