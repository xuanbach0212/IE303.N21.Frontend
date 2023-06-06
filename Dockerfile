FROM node:18-alpine as build

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --silent

RUN npm run build

COPY . ./

FROM nginx:1.21.1-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
