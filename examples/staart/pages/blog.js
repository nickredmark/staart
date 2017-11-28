import Layout from '../components/layout'
import withPage from '../providers/page'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import {compose} from 'recompose'
import {withUser} from 'ooth-client-react'

export default withPage(() => (
    <Layout title="Blog" page="dashboard">
        <div className="container">
            <h1>Blog</h1>
            <p>This is a sample blog to demonstrate ooth-graphql integration.</p>
            <p>You can explore the graphql api with <a href="/graphiql">graphiql</a>. Note how even via graphiql you can create posts only after registering/logging in.</p>
            <Blog/>
        </div>
    </Layout>
))

const PostsQuery = gql`
    query {
    posts {
        _id
        authorId
        title
        content
        comments {
        _id
        authorId
        content
        }
    }
    }
`
class BlogComponent extends React.Component {
    render() {
        const {data: {loading, posts, refetch}} = this.props
        if (loading) {
            return <p>Loading...</p>
        }
        return <div>
            <CreatePost onCreatePost={refetch}/>
            <h2>Posts</h2>
            <ul style={{listStyle: 'none', padding: 0}}>
                {posts.map(post => (
                    <li key={post._id}>
                        <h3>{post.title}</h3>
                        <div>
                            {post.content}
                        </div>
                        <h4>Comments</h4>
                        <CreateComment postId={post._id} onCreateComment={refetch}/>
                        {post.comments.map(comment => (
                            <div key={comment._id}>
                                <span>From: {comment.authorId}</span>
                                <div>
                                    {comment.content}
                                </div>
                            </div>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    }
}
const Blog = graphql(PostsQuery)(BlogComponent)

const CreatePostQuery = gql`
    mutation($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
        _id
    }
    }
`
class CreatePostComponent extends React.Component {
    render() {
        const {user, mutate, onCreatePost} = this.props
        if (!user) {
            return <p><a href={`/login?next=/blog`}>log in to write a post</a>.</p>
        }
        return <form onSubmit={e => {
            e.preventDefault()
            mutate({
                variables: {
                    title: this.title.value,
                    content: this.content.value
                }
            }).then(({data}) => {
                if (onCreatePost) {
                    onCreatePost()
                }
            }).catch(e => {
                console.error(e)
            })
        }}>
            <h2>Write post</h2>
            <div className="form-grouip">
                <label htmlFor="title">Title</label>
                <input
                    className="form-control"
                    ref={ref => {
                        this.title = ref
                    }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                    className="form-control"
                    ref={ref => {
                        this.content = ref
                    }}
                />
            </div>
            <button>Create</button>
        </form>
    }
}
const CreatePost = compose(
    withUser,
    graphql(CreatePostQuery)
)(CreatePostComponent)



const CreateCommentQuery = gql`
    mutation($postId: ID!, $content: String!) {
    createComment(postId: $postId, content: $content) {
        _id
    }
    }
`
class CreateCommentComponent extends React.Component {
    render() {
        const {user, mutate, onCreateComment, postId} = this.props
        if (!user) {
            return <p><a href={`/login?next=/blog`}>log in to comment</a>.</p>
        }
        return <form onSubmit={e => {
            e.preventDefault()
            mutate({
                variables: {
                    postId,
                    content: this.content.value
                }
            }).then(({data}) => {
                if (onCreateComment) {
                    onCreateComment()
                }
            }).catch(e => {
                console.error(e)
            })
        }}>
            <div className="form-group">
                <textarea
                    className="form-control"
                    ref={ref => {
                        this.content = ref
                    }}
                />
            </div>
            <button>Comment</button>
        </form>
    }
}
const CreateComment = compose(
    withUser,
    graphql(CreateCommentQuery)
)(CreateCommentComponent)
