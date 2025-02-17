# Docker build command

docker build -t esp32 .

# Docker run command

docker run --name esp32-01 -p 3000:3000 -p 3001:3001 esp32

# Running the Docker Compose

From the project root, execute:
  
docker-compose up --build -d

# ...existing instructions...


sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d somezing.me -d api.somezing.me --email atomikxp@gmail.com