FROM nginx:1.27-alpine

# Nginxの最小設定を差し替え
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 静的ファイル配置
COPY public/ /usr/share/nginx/html/

