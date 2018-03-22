#!/bin/bash

docker run --name="athena" \
    --volume=/var/run/docker.sock:/var/run/docker.sock \
    -p 3000:3000 \
	adn-athena:0.0.0