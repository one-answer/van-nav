#!/bin/bash
VERSION=${1:-v2}
docker build --pull . -f Dockerfile -t aolifu/nav:$VERSION
docker push aolifu/nav:$VERSION

docker stop nav
docker rm nav

docker run -d --restart=unless-stopped --name=nav -p 11010:6412 aolifu/nav:$VERSION
