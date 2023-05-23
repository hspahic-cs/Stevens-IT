#include <stdio.h>
#include <stdlib.h>
#include <getopt.h>
#include "mergesort.h"

int displayUsage(){
    printf("Usage: ./sort [-i|-d] filename\n-i: Specifies the file contains ints.\n-d: Specifies the file contains doubles.\n filename: The file to sort.\n");
    return 0;
}

int main(int argc, char* argv[]){
    
    int i_flag = 0; int d_flag = 0;
    int opt; int count = 0;
    while ((opt = getopt(argc, argv, ":id")) != -1) 
    {   
        count++;
        switch (opt) 
        {
        case 'i':
            i_flag = 1;
            break;
        case 'd':
            d_flag = 1;
            break;
        case '?':
            printf("Error: Unknown option '-%c' recieved.\n", optopt);
            displayUsage();
            return EXIT_FAILURE;
        case ':':
            displayUsage();
            return EXIT_FAILURE;
        }
        
    }
    
    // If too many flags -> return EXIT_FAILURE
    if(i_flag && d_flag){
        perror("Error: Too many flags specified.\n");
        return EXIT_FAILURE;
    }

    // If no inputs provided -> return EXIT_FAILURE
    if(argc == 1){
        displayUsage();
        return EXIT_FAILURE;
    }

    // If more than one file inputted -> return EXIT_FAILURE
    if((argc - count) > 2){
        perror("Error: Too many files specified.\n");
        return EXIT_FAILURE;
    }

    // If no file provided -> retun EXIT_FAILURE
    if (argc - count == 1){
        perror("Error: No input file specified.\n");
        return EXIT_FAILURE;
    }
    
    // Read file, put contents in pFile 
    FILE *pFile;
    pFile = fopen(argv[argc-1], "r");
    
    // If file does not exitst --> return EXIT_FAILURE
    if(pFile == NULL){;
        printf("Error: Cannot open '%s'. No such file or directory.\n", argv[argc-1]);
        return EXIT_FAILURE;
    }

    // Malloc if necessary --> If not change to float
    char data[1024][100];
    int index = 0;

    while(fscanf(pFile, "%s", data[index]) != EOF){
        index++;
    }

    fclose(pFile);

    fflush;

    int temp = index;
    
    if(d_flag){
        double* arr = (double *) malloc(sizeof(double) * 1024);
        while(temp >= 0){
            arr[temp] = atof(data[temp]);
            temp--;
        }
        mergesort(arr, index, sizeof(double), &dbl_cmp);

        for(int i = 0; i < index-1; i++){
            printf("%f\n", arr[i]);
        }
        free(arr);
    }

    else{
        int* arr = (int *) malloc(sizeof(int) * 1024);
        while(temp > 0){
            arr[temp] = atoi(data[temp]);
            temp--;
        }
        mergesort(arr, index, sizeof(int), &int_cmp);

        for(int i = 0; i < index-1; i++){
            printf("%d\n", arr[i]);
        }
        free(arr);
    }
    

    return 0;
}