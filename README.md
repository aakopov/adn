# Adn Aphine

Simple Web UI for Docker manage

# Build

1. npm run-script build
2. npm run-script build-server
3. docker build -t adn-athena:0.0.0 .

# Run

    docker run --name="athena" \
        --volume=/var/run/docker.sock:/var/run/docker.sock \
        -p 3000:3000 \
        adn-athena:0.0.0
