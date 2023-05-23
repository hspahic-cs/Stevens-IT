#include <sys/types.h>
#include <sys/socket.h>
#include <netdb.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>

// Compile with g++ [fileName] -o [execName]

int main(int argc, char *argv[]){
    
    // Input error checking
    if(argc != 2){
        printf("Usage: %s port\n", argv[0]);
        return EXIT_FAILURE;
    }

    int port = atoi(argv[1]);

    if(port < 1024){
        printf("Port must be above 1023!\n");
        return EXIT_FAILURE;
    }

    int socket_desc, client_sock, c, read_size;
    struct sockaddr_in server, client;
    char client_message[2000];
    double total = 0;

    // Create socket
    if((socket_desc = socket(AF_INET, SOCK_STREAM, 0)) == -1){
        fprintf(stderr, "Error: could not create socket. %s.\n", strerror(errno));
    }

    puts("Socket created");

    // Prepare the sockaddr_in structure
    server.sin_family = AF_INET;
    server.sin_addr.s_addr = INADDR_ANY;
    server.sin_port = htons(port);

    // Bind
    if(bind(socket_desc, (struct sockaddr *)&server, sizeof(server)) < 0){
        fprintf(stderr, "Error: bind failed. %s.\n", strerror(errno));
        return EXIT_FAILURE;
    }
    puts("bind done");
    
    // Listen
    listen(socket_desc, 3); // 3 is queue size for connections

    // Accept an incoming connection
    puts("Waiting for incoming connections...");
    c = sizeof(struct sockaddr_in);

    // Accept client connection
    client_sock = accept(socket_desc, (struct sockaddr *)&client, (socklen_t*)&c);
    if(client_sock < 0){
        perror("accept failed");
        return EXIT_FAILURE;
    }
    puts("Connection accepted");

    // Recieve number from client
    while((read_size = recv(client_sock, client_message, sizeof(client_message), 0)) > 0){
        total = total + atof(client_message);
        // Send message back to client
        sprintf(client_message, "%f", total);
        write(client_sock, client_message, sizeof(client_message));
    }

    if(read_size == 0){
        puts("Client disconnected");
        fflush(stdout);
    } else if(read_size == -1){
        perror("recv failed");
        return EXIT_FAILURE;
    }
    
    return 0;
}