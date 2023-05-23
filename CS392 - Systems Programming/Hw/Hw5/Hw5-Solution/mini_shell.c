#include <stdio.h>
#include <stdlib.h>
#include <pwd.h>
#include <unistd.h>
#include <string.h>
#include <signal.h>
#include <errno.h>
#include <sys/types.h>
#include <sys/signal.h>
#include <sys/wait.h>
#include "mini_shell.h"

const int max_inputs = 56; const int max_input_size = 256;

// prints terminal directory if print is true
// returns struct passwd* of struct
struct passwd* init_print(int print){
    struct passwd* pswd;
    uid_t uid = getuid();

    if((pswd = getpwuid(uid)) == NULL)
        fprintf(stderr, "Error: Cannot get passwd entry. %s.\n", strerror(errno));
    

    char pwd[max_input_size];
    if(getcwd(pwd, max_input_size) == NULL)
        fprintf(stderr, "Error: Cannot get current working directory. %s.\n", strerror(errno));

    if(print)
        printf("MSh:%s:%s>", pswd->pw_name, pwd);
    
    return pswd;
}

// rewrites usage of SIGINT to print error message  
void sigint_handler(int sig){
    printf("\nInvalid exit signal. If you'd like to exit use the [exit] command!\n");
    init_print(1);
    fflush(stdout);
}

// rewrites sigchld usage to terminate children working in bg_process
void sigchld_handler(int sig){
    int olderrno = errno;
    pid_t pid;
    while((pid = waitpid(-1, NULL, WNOHANG)) > 0){
        printf("\npid: %d done\n", pid);
    }
    errno = olderrno;
}

// parses input into individual commands + args into cmd array
// return 0 on failure, and number of arguments on success
int read_input(char** cmd){
    char input[max_input_size];
    const char delim[2] = " ";
    int ncmd = 0;
    char* token;
    
    // Prints pwd for user
    init_print(1);

    // reads + parses string
    if(fgets(input, max_input_size, stdin) == NULL){
        fprintf(stderr, "Error: Failed to read from stdin. %s.\n", strerror(errno));
        return 0;
    }
    input[strcspn(input, "\n")] = 0;

    token = strtok(input, delim);  

    while(token != NULL){
        strcpy(cmd[ncmd], token);
        token = strtok(NULL, delim);
        ncmd++;
    }

    // rewrites buffer after last argument to NULL
    // this is due to execvp's usage 
    // if no commands, don't rewrite
    if(ncmd > 0){
        free(cmd[ncmd]);
        cmd[ncmd] = NULL;    
    }

    return ncmd;
}

// runs forground process, returns 1 on success and 0 on failure
int run_fgprocess(int ncmd, char** cmd){
    pid_t pid;

    if((pid = fork()) < 0){
        fprintf(stderr, "Error fork() failed. %s.\n", strerror(errno));
        return 0;
    }
    else if(pid == 0){
        if(execvp(cmd[0], cmd) == -1){
            fprintf(stderr, "Error: exec() failed. %s.\n", strerror(errno));
            exit(0);
        }
    }
    if(waitpid(pid, NULL, 0) < 0){
        fprintf(stderr, "Error wait() failed. %s.\n", strerror(errno));
        return 0;
    } 

    return 1;
}

// runs background process
void run_bgprocess(int ncmd, char** cmd){
    pid_t pid;
    if(signal(SIGCHLD, sigchld_handler) == SIG_ERR)
        fprintf(stderr, "Error: Cannot register signal handler. %s.\n", strerror(errno));
    
    if((pid = fork()) < 0){
        fprintf(stderr, "Error fork() failed. %s.\n", strerror(errno));
    }

    else if(pid == 0){
        printf("pid: %d cmd: ", getpid());
        for(int i = 0; i < ncmd - 1; i++)
            printf("%s ", cmd[i]);
        printf("\n");    
        if(execvp(cmd[0], cmd) == -1)
            fprintf(stderr, "Error: exec() failed. %s.\n", strerror(errno));
    }

}


// parses commands & executes necessary function accordingly
// return 0 on failure, 1 on success
int cmd_handler(int ncmd, char** cmd){
    // Terminate mini_shell + children
    if(strcmp(cmd[0], "exit") == 0){
        // Free memory on termination
        for(int i = 0; i < max_inputs; i++){
            free(cmd[i]);
        }   
        free(cmd);    
        killpg(getpid(), SIGTERM);
    }
    // Run cd command
    else if(strcmp(cmd[0], "cd") == 0){
        if(ncmd > 2){
            printf("Error: Too many arguments to cd.\n");
            return 0;
        }
        else if(chdir(cmd[1]) < 0){
            fprintf(stderr, "Error: Cannot change directory to %s. %s.\n", cmd[0], strerror(errno));
            return 0;
        }
    }
    else if(ncmd > 0){
        if(strcmp(cmd[ncmd -1], "&") == 0){
            // Rewrite & to NULL and call background process
            // For usage of execvp
            free(cmd[ncmd -1]);
            cmd[ncmd - 1] = NULL;
            run_bgprocess(ncmd, cmd);
        }
        else
            if(!run_fgprocess(ncmd, cmd))
                return 0;
    }

    // Clear cmd buffer if command is executed
    if(ncmd > 0){
        cmd[ncmd] = malloc(max_input_size);
        
        if(cmd[ncmd -1] == NULL)
            cmd[ncmd - 1] = malloc(max_input_size);
    }
    
    return 1;
}

int main(int argc, char* args[]){
    // Init memory for cmd
    char **cmd = (char**)malloc(max_inputs * sizeof(char *));
    for(int i = 0; i < max_inputs; i++){
        cmd[i] = (char *)malloc(max_input_size);
    }

    // Change signal handler for SIGINT
    if(signal(SIGINT, sigint_handler) == SIG_ERR)
        fprintf(stderr, "Error: Cannot register signal handler. %s.\n", strerror(errno));

    // Repeatedly execute mini_shell 
    while(1){
        int ncmd;
        ncmd = read_input(cmd);
        cmd_handler(ncmd, cmd);
    }  

    // Free in case an error causes the minishell
    // to exit via main loop
    for(int i = 0; i < max_inputs; i++){
            free(cmd[i]);
        }   
    free(cmd);    
}

