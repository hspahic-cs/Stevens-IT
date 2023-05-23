#include <ctype.h>
#include <errno.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <wait.h>


int main(int argc, char *argv[]) {

    /*
      TODO:
      Use fork() and pipe(), but NOT popen().

      Create a pipe through which a child process will send two integers to 
      the parent. The parent will add the integers and print the result to 
      the terminal. 

      OPTIONAL:
      Make a second child, which will do the addition. In this case, the parent
      waits for the children to terminate. (See Lab 6 or 7.)
    */
    int pid;
    int n;
    int fd[2];
    char line[8];

    if(pipe(fd) < 0)
      fprintf(stderr, "Pipe failed. %s.\n", strerror(errno));
    if((pid = fork()) < 0){
      fprintf(stderr, "Fork failed. %s.\n", strerror(errno));
      exit(0);
    } else if(pid == 0){
      // This is the child
      close(fd[0]);
      int firstInt = 10; int secondInt = 7;
      write(fd[1], &firstInt , 4);
      write(fd[1], &secondInt, 4);
    } else{
      close(fd[1]);
      char first_num[4]; char second_num[4];
      
      read(fd[0], first_num, 4);
      read(fd[0], second_num, 4);

      int first_int = *(int *)(first_num);
      int second_int = *(int *)(second_num);

      if((pid = fork()) < 0){
        fprintf(stderr, "Second Pipe failed. %s.\n", strerror(errno));
      } else if(pid == 0){
        printf("Sum is %d\n", (first_int + second_int));
      } 
    }

    
    return EXIT_SUCCESS;
}
