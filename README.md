1. docker build . -t madi2/alfalah:dev-1.0.0
2. docker push madi2/alfalah:dev-1.0.0


# serveur
docker pull madi2/alfalah:dev-1.0.0 && docker rm -f  alfalah && docker run -d -p 8003:80 --name alfalah madi2/alfalah:dev-1.0.0


