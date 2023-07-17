#!/bin/sh
docker build -t gym-app . && docker run -it --rm -d -p 8082:80 --name gym-app gym-app
