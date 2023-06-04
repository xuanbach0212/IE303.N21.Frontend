FROM node:17-alpine

WORKDIR /client

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --silent

RUN npm install -g npm@9.5.0 --silent

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]