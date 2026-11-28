# oneCRM VPS Deployment Script
$ErrorActionPreference = "Stop"

$vpsIp = "46.224.81.131"
$key = "$env:USERPROFILE\.ssh\id_ed25519"
$domain = "demo.onecrm.io.vn"
$previewPort = 8092

Write-Host "1. Building VitePress site..." -ForegroundColor Cyan
npm run build

Write-Host "2. Compressing build archive..." -ForegroundColor Cyan
$tarFile = "$PSScriptRoot\dist.tar.gz"
if (Test-Path $tarFile) { Remove-Item $tarFile -Force }
tar -czf "$tarFile" -C ".vitepress/dist" .

Write-Host "3. Uploading archive to VPS ($vpsIp)..." -ForegroundColor Cyan
scp -i $key -o StrictHostKeyChecking=no "$tarFile" "root@${vpsIp}:/tmp/onecrm_dist.tar.gz"

Write-Host "4. Extracting and configuring Nginx on VPS..." -ForegroundColor Cyan
$remoteCommands = @"
set -e
echo "-> Unpacking site files..."
rm -rf /home/onecrm/htdocs/${domain}/*
tar -xzf /tmp/onecrm_dist.tar.gz -C /home/onecrm/htdocs/${domain}/
rm -f /tmp/onecrm_dist.tar.gz
chown -R onecrm:onecrm /home/onecrm/htdocs/${domain}

echo "-> Configuring Nginx preview port $previewPort..."
cat << 'EOF' > /etc/nginx/sites-available/onecrm-preview.conf
server {
  listen $previewPort;
  server_name _;
  root /home/onecrm/htdocs/${domain};
  index index.html;

  location / {
    try_files `$uri `$uri/ `$uri.html /index.html;
  }

  location ~* ^.+\.(css|js|jpg|jpeg|gif|png|ico|gz|svg|svgz|ttf|otf|woff|woff2|eot|mp4|ogg|ogv|webm|webp|zip|swf|json)$ {
    add_header Access-Control-Allow-Origin "*";
    expires max;
    access_log off;
  }
}
EOF

ln -sf /etc/nginx/sites-available/onecrm-preview.conf /etc/nginx/sites-enabled/onecrm-preview.conf

echo "-> Updating domain vhost..."
cat << 'EOF' > /etc/nginx/sites-available/${domain}.conf
server {
  listen 80;
  listen [::]:80;
  listen 443 quic;
  listen 443 ssl;
  listen [::]:443 quic;
  listen [::]:443 ssl;
  http2 on;
  http3 off;
  ssl_certificate_key /etc/nginx/ssl-certificates/${domain}.key;
  ssl_certificate /etc/nginx/ssl-certificates/${domain}.crt;
  server_name ${domain};
  root /home/onecrm/htdocs/${domain};

  access_log /home/onecrm/logs/nginx/access.log main;
  error_log /home/onecrm/logs/nginx/error.log;

  if (`$scheme != "https") {
    rewrite ^ https://`$host`$request_uri permanent;
  }

  location ~ /.well-known {
    auth_basic off;
    allow all;
  }

  include /etc/nginx/global_settings;

  index index.html;

  location / {
    try_files `$uri `$uri/ `$uri.html /index.html;
  }

  location ~* ^.+\.(css|js|jpg|jpeg|gif|png|ico|gz|svg|svgz|ttf|otf|woff|woff2|eot|mp4|ogg|ogv|webm|webp|zip|swf|json)$ {
    add_header Access-Control-Allow-Origin "*";
    add_header alt-svc 'h3=":443"; ma=86400';
    expires max;
    access_log off;
  }
}
EOF

ln -sf /etc/nginx/sites-available/${domain}.conf /etc/nginx/sites-enabled/${domain}.conf

echo "-> Opening port $previewPort in firewall..."
ufw allow ${previewPort}/tcp

echo "-> Reloading Nginx..."
nginx -t
nginx -s reload

echo "SUCCESS"
"@

ssh -n -i $key -o StrictHostKeyChecking=no root@${vpsIp} "$remoteCommands"

Remove-Item $tarFile -Force -ErrorAction SilentlyContinue
Write-Host "Deployment completed! Direct preview: http://${vpsIp}:${previewPort}" -ForegroundColor Green
