FROM nginx:1.21.0-alpine
WORKDIR /usr/share/nginx/html
COPY ./dist/frontend .
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80