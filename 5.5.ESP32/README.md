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

# To check if nginx is working with HOST: WEBSITE
# Run this in powershell 
Invoke-WebRequest -Uri http://localhost -Headers @{ "Host" = "api.somezing.me" }
Invoke-WebRequest -Uri http://localhost -Headers @{ "Host" = "somezing.me" }

# Run in linux 
curl -H "Host: api.somezing.me" http://localhost


# How this website works (progress journey)

1. The main application is vite based, connects to firebase database to get the globalCount value.

2. There is a login page for minor authintication process.

3. There is also api.js file that runs simultaneously for api response(made for esp32 connection). It has passwork checking which compares values passed by headers and compares its hashed value to the actual password.

# Problems i faced during building this project:

1. The firebase connection with live database.
2. Api.js woking parallely but not using concurrently package for resource saving.
3. The docker image is still on heavier side reduction needed.
4. Using nginx the connection request hard to check, had to use curl with header for local checking.
5. Certbot was not working properly with server because of port blocking.
6. Connection need to be secure the nginx.conf needed much modification.
7. Used https even inside docker because at first it was not decided to use nginx.
8. The reverse proxy with nginx is and certbot varificaion failed multiple times.