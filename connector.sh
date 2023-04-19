#!/bin/bash

ip=$(docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' bimehdb)

export $IP_DOCKER=$ip