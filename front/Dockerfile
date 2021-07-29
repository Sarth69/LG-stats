FROM node:16-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN ["npm", "run", "build"]



FROM nginx:1.21-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/.env.template /usr/share/nginx/html/.env
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

RUN apk add --update nodejs
RUN apk add --update npm
RUN npm install -g runtime-env-cra

WORKDIR /usr/share/nginx/html

EXPOSE 80

CMD ["/bin/sh", "-c", "runtime-env-cra && nginx -g \"daemon off;\""]