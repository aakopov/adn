#!/bin/bash

npm run-script build
tsc -p server
docker build -t adn-athena:0.0.0 .