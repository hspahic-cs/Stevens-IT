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

    FILE* out = fopen(argv[2], "wb");
    if (out == NULL){
        perror("Output file cannot be written to!");
        exit(-1);
    }
    
    data td = {};

    char line[400] = "";

    // Initialize all variables to be read into struct

    int ui;
    unsigned short ii;
    unsigned char r;
    long int t;

    // Read in each text line
    while(fgets(line, 400, in)){
        // Parse text and store values into address of variables
        sscanf(line, "%d\t%hu\t%c\t%li\n", &ui, &ii, &r, &t);
        // Fill struct with all variables
        td.user_id = ui;
        td.item_id = ii;
        td.rating = r;
        td.timestamp = t;
        // Write bin values into out file
        fwrite(&td,sizeof(data),1, out);
    }

    fclose(in);
    fclose(out);
}