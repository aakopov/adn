#!/bin/bash

npm run-script build
npm run-script build-server
docker build -t `node app-version.js` .