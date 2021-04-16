FROM node:15.5

WORKDIR /usr/src/app/server

COPY package.json ./

COPY yarn.lock ./

RUN yarn

COPY . .

ENV NODE_ENV development

EXPOSE 8080

CMD [ "yarn", "develop" ]