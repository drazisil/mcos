# Can be located at https://archive.org/details/nginx_1.9.8.tar if needed
FROM nginx:1.9.8 AS base

COPY nginx.conf /etc/nginx/nginx.conf
COPY mcouniverse.pem /etc/nginx/mcouniverse.pem
COPY private_key.pem /etc/nginx/private_key.pem
COPY fullchain1.pem /etc/nginx/fullchain1.pem
COPY privkey1.pem /etc/nginx/privkey1.pem