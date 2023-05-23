#include <sys/types.h>
#include <sys/socket.h>
#include <netdb.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <arpa/inet.h>

#define IP_ADDR "127.0.0.1"

int main(int argc , char *argv[])
{   
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

	int sock;
	struct sockaddr_in server;
	char message[1000], server_reply[2000];
	
	// Create socket
	if ((sock = socket(AF_INET , SOCK_STREAM , 0)) == -1){
		printf("Could not create socket");
        return EXIT_FAILURE;
	}
	puts("Socket created");
	
	server.sin_addr.s_addr = inet_addr("127.0.0.1");
	server.sin_family = AF_INET;
	server.sin_port = htons( port );

	//Connect to remote server
	if (connect(sock , (struct sockaddr *)&server , sizeof(server)) < 0){
		perror("connect failed. Error");
		return EXIT_FAILURE;
	}
	
	puts("Connected\n");
	
	//keep communicating with server
	while(1)
	{
		printf("Enter your number: ");
		scanf("%s" , message);
		
		//Send some data
		if(send(sock, message, strlen(message), 0) < 0)
		{
			puts("Send failed");
			return EXIT_FAILURE;
		}
		
		//Receive a reply from the server
		if(recv(sock , server_reply , sizeof(server_reply) , 0) < 0)
		{
			puts("recv failed");
			break;
		}
		
		printf("Current total: %f\n", atof(server_reply));
	}
	
	close(sock);
	return 0;
}