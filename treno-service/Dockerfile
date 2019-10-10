// taking the NodeJS image as the base for our docker image,
  create a user for avoiding non-root user,
  copy the src to our image then we install the dependencies,
  expose a number port and finally we instantiate our treni-service.//

FROM node:7.5.0-alpine

RUN addgroup -S nupp && adduser -S -g nupp nupp

ENV HOME=/home/nupp

COPY package.json npm-shrinkwrap.json $HOME/app/

COPY src/ $HOME/app/src

ADD https://github.com/Yelp/dumb-init/releases/download/v1.1.1/dumb-init_1.1.1_amd64 /usr/local/bin/dumb-init

WORKDIR $HOME/app

RUN chown -R nupp:nupp $HOME/* /usr/local/ && \
    chmod +x /usr/local/bin/dumb-init && \
    npm cache clean && \
    npm install --silent --progress=false --production && \
    chown -R nupp:nupp $HOME/*

USER nupp

EXPOSE 3000

CMD ["dumb-init", "npm", "start"]
