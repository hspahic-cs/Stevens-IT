#include <stdio.h>
#include <string.h>
#include <stdlib.h>

// Create struct for data & fill it with respective data

typedef struct data{
    int user_id;
    unsigned short item_id;
    unsigned char rating;
    long int timestamp;
}data;

int main(int argc, char* argv[]){
    
    // Check arg size

    if(argc != 3){
        perror("Invalid number of arguments supplied");
        exit(-1);
    }

    // Open read in and read out file

    FILE* in = fopen(argv[1], "r");

    if (in == NULL){
        perror("Input file cannot be read from!");
        exit(-1);
    }

    FILE* out = fopen(argv[2], "w");
    if (out == NULL){
        perror("Output file cannot be written to!");
        exit(-1);
    }
    
    data td = {};
    
    // Read into struct from binary
    while(fread(&td, sizeof(data), 1, in)){
        // Write to file each variable in struct into out file with correct formatting
        fprintf(out, "%d\t%hu\t%c\t%li\n", td.user_id, td.item_id, td.rating, td.timestamp);
    };

    fclose(in);
    fclose(out);
    return 0;

}