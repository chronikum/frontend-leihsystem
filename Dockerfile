FROM node:16-alpine AS builder
WORKDIR /usr/app
COPY . .
RUN npm install
RUN npm run prod

FROM nginx:1.21.0-alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /usr/app/dist/frontend .
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80