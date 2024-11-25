# base image
FROM node:20.9.0

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY wtc-the-game/package.json /usr/src/app/package.json
COPY wtc-the-game/package-lock.json /usr/src/app/package-lock.json
RUN npm install

COPY wtc-the-game/ .

# start app
CMD ["npm", "start"]