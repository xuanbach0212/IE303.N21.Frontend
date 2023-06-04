# syntax=docker/dockerfile:1
FROM node:lts-alpine3.17 AS builder

WORKDIR /client

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install -g npm@9.5.0 --silent

RUN npm install --silent

COPY . .

RUN npm run build

FROM nginx:alpine AS runner

COPY --from=builder /client/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]