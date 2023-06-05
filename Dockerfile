FROM node:17-alpine

WORKDIR /client

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --silent

RUN npm install @okta/okta-signin-widget@6.3.3 --silent

RUN npm install @okta/okta-react@6.4.3 --silent

RUN npm install react-router-dom@5.3.3 --silent

COPY . ./

EXPOSE 3001

CMD ["npm", "start"]
