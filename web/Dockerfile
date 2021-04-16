FROM node:15.5

WORKDIR /usr/src/app/web

COPY package.json ./

COPY yarn.lock ./

RUN yarn

EXPOSE 3000

CMD ["yarn", "develop"]