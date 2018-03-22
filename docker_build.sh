#!/bin/bash

npm run-script build
npm run-script build-server
docker build -t adn-athena:0.0.0 .