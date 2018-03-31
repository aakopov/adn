# Adn Aphine

Simple Web UI for Docker manage

# Build

1. npm run-script build
2. npm run-script build-server
3. docker build -t `node app-version.js` .

# Run

    docker service create \
        --name athena \
        --mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
        -p 3000:3000 \
	    `node app-version.js`