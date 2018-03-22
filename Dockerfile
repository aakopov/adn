FROM node
LABEL maintainer="Alexander Akopov <akopov.alexander@gmail.com>"
ADD dist athena/dist
COPY package.json athena/
RUN cd athena && npm install
ENTRYPOINT [ "node", "/athena/dist/server/index.js" ]
EXPOSE 3000
