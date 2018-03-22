FROM node
LABEL maintainer="Alexander Akopov <akopov.alexander@gmail.com>"
ADD dist athena
ENTRYPOINT [ "node athena/server/index.js" ]
EXPOSE 3000
