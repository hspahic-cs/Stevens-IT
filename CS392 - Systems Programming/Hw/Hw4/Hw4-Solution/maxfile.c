#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>
#include <dirent.h>
#include <libgen.h>
#include <unistd.h>

// Struct to hold desired data
typedef struct maxfiles{
    unsigned long w_max;
    unsigned long nw_max;
    char w_name[400];
    char nw_name[400];
    unsigned long disk_usage;
}maxfiles;

// Displays usage on error
void display_usage(char *progname) {
 printf("Usage: %s <filename>\n", progname);
}

/* rec_compare: fills struct with largest writeable / non-writable files & disk size in directory tree 
        char* dir_name -> absoluth path to the directory being traversed
        struct maxfiles *cur_max -> pointer to struct in 'main' holding all relevant data    */
void rec_compare(char* dir_name, struct maxfiles *cur_max){
    // Init relevant data
    DIR *cur_dir;
    struct dirent *df;    
    struct stat statbuf;

    // Open directory
    if((cur_dir = opendir(dir_name)) == 0){
        perror("ERROR: Unable to open file");
        exit(1);
    }

    // Traverse files in directory
    while((df = readdir(cur_dir)) != 0){
        // Append filename to previous directory
        char path[1024];
        sprintf(path, "%s/%s", dir_name, df->d_name);
        
        // Get the stat of the current file
        if(stat(path, &statbuf) >= 0){
            // If file is a directory & executable (needs to be executable for stat to use it), recurse
            if(S_ISDIR(statbuf.st_mode) && (statbuf.st_mode & (S_IXUSR || S_IXGRP || S_IXOTH))){
                if(strcmp(df->d_name, ".") && strcmp(df->d_name, "..")){
                    rec_compare(path, cur_max);
                }
            }else{
                // If file is NOT directory, get file size & permissions and replace if larger
                // Also add file_size to disk_total
                cur_max->disk_usage += statbuf.st_size;
                if(statbuf.st_mode & S_IWUSR){
                    if(statbuf.st_size > cur_max->w_max){
                        cur_max->w_max = statbuf.st_size;
                        strcpy(cur_max->w_name, df->d_name);
                    }
                } else{
                    if(statbuf.st_size > cur_max->nw_max){
                        cur_max->nw_max = statbuf.st_size;
                        strcpy(cur_max->nw_name, df->d_name);
                    }
                }
            }
        }
    }
    // Before closing directory, add its size to total disk
    cur_max->disk_usage += 4096;
    closedir(cur_dir);
}

int main(int argc, char* argv[]){
    if(argc != 2){
        display_usage(argv[0]);
        return EXIT_FAILURE;
    }

    // Construct absolute path
    char target_path[400];

    getcwd(target_path,400);
    strcat(target_path, "/");
    strcat(target_path, argv[1]);

    if(target_path[strlen(target_path) - 1] == '/'){
        target_path[strlen(target_path)- 1] = '\0';
    }

    maxfiles storage = {};
    // Call function & print results
    rec_compare(target_path, &storage);
    printf("Max writeable file %s: %ld bytes\n", storage.w_name, storage.w_max);
    printf("Max non-writeable file %s: %ld bytes\n", storage.nw_name, storage.nw_max);
    printf("Total disk_usage is %ld bytes\n", storage.disk_usage);
}