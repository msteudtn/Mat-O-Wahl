FROM nginx:1.27.3 AS mat-o-wahl
COPY . /usr/share/nginx/html/

EXPOSE 80
