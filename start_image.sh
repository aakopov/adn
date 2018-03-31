#!/bin/bash

#docker run --name="athena" \
#    --volume=/var/run/docker.sock:/var/run/docker.sock \
#    -p 3000:3000 \
#	adn-athena:0.0.0

docker service create \
    --name athena \
    --mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
    -p 3000:3000 \
	`node app-version.js`