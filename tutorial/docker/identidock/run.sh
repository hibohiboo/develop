export COMPOSE_FILE=docker-compose.yml
docker run -p 5000:5000 -v "$(pwd)"/app:/app identidock
