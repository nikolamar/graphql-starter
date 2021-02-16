#!/bin/bash

echo Deploy version?
read VERSION

echo Host IP addresss?
read HOST

echo Docker repository?
read REPO

docker build -t ${REPO}:$VERSION .
docker push ${REPO}:$VERSION
ssh root@$HOST "docker pull ${REPO}:$VERSION && docker tag ${REPO}:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"