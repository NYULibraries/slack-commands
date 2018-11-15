#!/bin/sh -e

: "${IMAGES_DOMAIN?Must specify IMAGES_DOMAIN}"

docker tag slack-commands $IMAGES_DOMAIN/slack-commands:latest
docker push $IMAGES_DOMAIN/slack-commands:latest
