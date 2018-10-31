#!/bin/sh -e

: "${IMAGES_DOMAIN?Must specify IMAGES_DOMAIN}"

docker pull $IMAGES_DOMAIN/slack-commands:latest