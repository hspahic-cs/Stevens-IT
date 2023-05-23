/*******************************************************************************
 * Name        : unique.cpp
 * Author      : Harris Spahic
 * Date        : 9/20/2021
 * Description : Determining uniqueness of chars with int as bit vector.
 * Pledge      : "I pledge my honor I have abided by the Stevens Honor System"
 ******************************************************************************/
#include <iostream>
#include <cctype>
#include <sstream>
#include <cstring>

using namespace std;

bool is_all_lowercase(const string &s) {
    // TODO: returns true if all characters in string are lowercase
    // letters in the English alphabet; false otherwise.
    for(int i = 0; i < (int)s.length(); i++){
        if(isdigit(s.at(i)) || isupper(s.at(i))){
            return false;
        }
    }
    return true;
}

bool all_unique_letters(const string &s) {
    // TODO: returns true if all letters in string are unique, that is
    // no duplicates are found; false otherwise.
    // You may use only a single int for storage and work with bitwise
    // and bitshifting operators.
    // No credit will be given for other solutions.
    unsigned int storage = 0;
    unsigned int setter;
    for(int i = 0; i < (int)s.length(); i++){
        setter = 1 << (s.at(i) - 'a');
        if((storage & setter) == 0){
            storage = storage | setter;
        }
        else{
            return false;
        }
    }
    return true;
}

int main(int argc, char * const argv[]) {
    // TODO: reads and parses command line arguments.
    // Calls other functions to produce correct output.
    string s;
    istringstream iss;

    if(argc == 1 || argc > 2){
        cerr << "Usage: ./unique <string>" << endl;
        return 1;
    }

    iss.str(argv[1]);
    if(!(iss >> s)){
        cerr << "Error: String must contain only lowercase letters." << endl;
        return 1;
    }


    if(!is_all_lowercase(s)){
        cerr << "Error: String must contain only lowercase letters." << endl;
        return 1;
    }

    if(all_unique_letters(s)){
        cout << "All letters are unique." << endl;
    }

    else{
        cout << "Duplicate letters found." << endl;
    }

    return 0;
}
