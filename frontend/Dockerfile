FROM node:20

RUN mkdir -p /home/node/front/node_modules
RUN chown -R node:node /home/node/front

WORKDIR /home/node/front

COPY package.json ./

USER node

RUN npm install

COPY --chown=node:node . .

RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start" ]
