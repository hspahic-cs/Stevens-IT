#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>
#include <errno.h>


int main(int argc, char* argv[]){
    int ls_grep[2]; int grep_p[2];
    pid_t pid;
    
    if(argc != 2){
        printf("Incorrect usage: ./a.out [directory] \n");
        return EXIT_FAILURE;
    }

    // Open pipe from ls to grep
    if(pipe(ls_grep) == -1){
        fprintf(stderr, "Pipe failed. %s.\n", strerror(errno));
        return EXIT_FAILURE;
    }

    // Fork 1st child 
    if((pid = fork()) < 0){
        fprintf(stderr, "Fork failed. %s. \n", strerror(errno));
        return EXIT_FAILURE;
    } else if(pid == 0){
        // On success, change std_out to write end of ls_grep
        if(dup2(ls_grep[1], STDOUT_FILENO) == -1){
            fprintf(stderr, "dup2 failed. %s .\n", strerror(errno));
            return EXIT_FAILURE;
        }
        close(ls_grep[0]);

        // Execute ls -al
        if(execlp("ls", "ls", "-l", argv[1], (char *) NULL) == -1){
            fprintf(stderr, "execlp failed. %s.\n", strerror(errno));
        }

        fprintf(stderr, "Error: ls failed. %s.\n", strerror(errno));
        exit(1);
    }

    // Wait on child 1
    if ((wait(NULL)) == -1){
        fprintf(stderr, "child 1 was never reaped. %s.\n", strerror(errno));
        return EXIT_FAILURE;
    }

    // Open pipe from grep to parent
    if(pipe(grep_p) == -1){
        fprintf(stderr, "Pipe failed. %s. \n", strerror(errno));
        return EXIT_FAILURE;
    }

    // Fork 2nd child
    if((pid = fork()) < 0){
        fprintf(stderr, "Fork failed. %s. \n", strerror(errno));
        return EXIT_FAILURE;
    } else if(pid == 0){
        // Change std_fileno to corresponding pipes
        if(dup2(ls_grep[0], STDIN_FILENO) == -1 || dup2(grep_p[1], STDOUT_FILENO) == -1){
            fprintf(stderr, "dup2 failed. %s .\n", strerror(errno));
            return EXIT_FAILURE;
        }
        close(ls_grep[1]);
        close(grep_p[0]);

        // Execute grep ^d
        execlp("grep", "grep", "^d", (char *) NULL);

        fprintf(stderr, "Error: grep failed. %s. \n", strerror(errno));
        exit(1);
    }   
    
    // Close unused pipes
    close(ls_grep[0]);
    close(ls_grep[1]);
    close(grep_p[1]);

    // Wait on child2 
    if ((wait(NULL)) == -1){
        fprintf(stderr, "child 2 was never reaped. %s. \n", strerror(errno));
        return EXIT_FAILURE;
    }  

    char buf;
    int count = 0; int err_chk;

    // Read byte by byte, counting newlines
    while((err_chk = read(grep_p[0], &buf, 1)) != 0){
        if(err_chk < 0){
           fprintf(stderr, "Read failed. %s. \n", strerror(errno));
           return EXIT_FAILURE;
        } else if(buf == '\n'){
            count++;
        }
        printf("%c", buf);
    }
    
    // Print to stdout number of newlines
    printf("The current count is: %d\n", count);

    return EXIT_SUCCESS;
}