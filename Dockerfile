FROM node

# MAINTAINER Jesús Montalvo <chuy_ronald@hotmail.com>

WORKDIR /home/app-node

COPY package*.json ./

RUN npm install

COPY . .

CMD ["bash","./scripts/start.sh" ]