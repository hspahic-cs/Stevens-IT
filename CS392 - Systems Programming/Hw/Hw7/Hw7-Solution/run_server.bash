#! /bin/bash

g++ server.c -o server
g++ client.c -o client

./server 3500 &
./client 3500
