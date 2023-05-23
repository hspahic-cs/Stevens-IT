#include <stdio.h>
#include <string.h>
#include <stdlib.h>

typedef struct data{
    int user_id;
    unsigned short item_id;
    unsigned char rating;
    long int timestamp;
}data;

typedef struct data2{
    int user_id;
    unsigned long item_id;
    unsigned char rating;
    long int timestamp;
}data2;

int main(int argc, char* argv[]){

    // Check arg number && open file   
    if(argc != 4){
        perror("Incorrect number of arguments");
        return 1;
    }
    
    FILE* in = fopen(argv[2], "r");
    if(in == NULL){
        perror("<item file> unable to be read!");
        return 1;
    }

    // Initialize offsets pointer & line array to be read into
    char line[400] = ""; 
    unsigned long *offsets = (unsigned long*)malloc(sizeof(unsigned long));
    int index; int current_size = 0;

    // Read each line, resize offset pointer to hold up to index and store offset into index
    // Assumption 400 char per line ~ (**COULD BE WRONG**)
    while(fgets(line, 400, in)){
        sscanf(line, "%u", &index);
        offsets = (unsigned long*)realloc(offsets, (index+1) * sizeof(unsigned long));
        *(offsets + index) = ftell(in);
        current_size = index;
    }
        
    fclose(in);

    //Read binary file & return new binary with changed index offsets
    for(int i = 0; i < 1000; i++){
        printf("%lu\n", *(offsets + i));
    }

    FILE* bin_in = fopen(argv[1], "r");
    if(bin_in == NULL){
        perror("<binary file> unable to be read!");
        return 1;
    }

    FILE* bin_out = fopen(argv[3], "w");
    if(bin_out == NULL){
        perror("<output file> unable to be written to!");
        return 1;
    }

    // Initialize structs to help hold data 
    data td = {};
    data2 td2 = {};


    // Read data from bin file, change id to offset, then write new data
    while(fread(&td, sizeof(data), 1, bin_in)){
        unsigned long ii = *(offsets + td.item_id - 1);
        
        td2.user_id = td.user_id;
        td2.item_id = ii;
        td2.rating = td.rating;
        td2.timestamp = td.timestamp;

        fwrite(&td2,sizeof(data2),1, bin_out);
    };

    fclose(bin_in);
    fclose(bin_out);
    free(offsets);

    return 0;
}
