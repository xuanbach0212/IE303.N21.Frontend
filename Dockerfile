FROM node:18-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --silent

COPY . .

# RUN npm run build

# FROM nginx:1.21.1-alpine as runner

# COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["npm", "start"]

