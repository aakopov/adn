FROM node
LABEL maintainer="Alexander Akopov <akopov.alexander@gmail.com>"
ADD dist/* athenta/
ENTRYPOINT [ "node athena/server/index.js" ]
EXPOSE 3000
