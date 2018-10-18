git push server master
ssh me@nmr.io << EOF
  set -e
  cd Documents/staart/staart
  git merge master
  npm start
  docker logs -f 
EOF
