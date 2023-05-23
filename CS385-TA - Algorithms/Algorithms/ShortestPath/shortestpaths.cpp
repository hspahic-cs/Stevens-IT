/*******************************************************************************
 * Name        : inversioncounter.cpp
 * Author      : Spruha Paradkar & Harris Spahic
 * Version     : 1.0
 * Date        : 10/28/2021
 * Description : Counts the number of inversions in an array.
 * Pledge      : I pledge my honor that I have abided by the Stevens Honor System. 
 ******************************************************************************/
#include <iostream>
#include <climits>
#include <algorithm>
#include <sstream>
#include <vector> 
#include <cstdio>
#include <cctype>
#include <cstring>
#include <fstream>
#include <iomanip> 
using namespace std;
const long INF = LONG_MAX; 
vector<long> path; 

/** 
 * Displays the matrix on the screen formatted as a table. 
 */ 

void RecurseTransition(int i, int j, long** char_matrix){
    if(char_matrix[i][j] == INF){
        path.push_back((long)i);
        return;
    }
    
    long vertex = char_matrix[i][j];

    RecurseTransition(i, vertex, char_matrix);
    RecurseTransition(vertex, j, char_matrix);
}  

int len (long digit){
    int count = 1; 
    while (digit > 9){
        digit = digit/10; 
        count ++;
    }
    return count; 
}

void display_table(long** const matrix, const string &label, 
                   int num_vertices, const bool use_letters = false) { 
    cout << label << endl; 
    long max_val = 0; 
    for (int i = 0; i < num_vertices; i++) { 
        for (int j = 0; j < num_vertices; j++) { 
            long cell = matrix[i][j]; 
            if (cell < INF && cell > max_val && cell > 0) { 
                max_val = matrix[i][j]; 
            } 
        } 
    }
    
 
    int max_cell_width = use_letters ? len(max_val):
            len(max(static_cast<long>(num_vertices), max_val)); 
    cout << ' '; 
    for (int j = 0; j < num_vertices; j++) { 
        cout << setw(max_cell_width + 1) << static_cast<char>(j + 'A'); 
    } 
    cout << endl; 
    for (int i = 0; i < num_vertices; i++) { 
        cout << static_cast<char>(i + 'A'); 
        for (int j = 0; j < num_vertices; j++) { 
            cout << " " << setw(max_cell_width); 
            if (matrix[i][j] == INF) { 
                cout << "-"; 
            } else if (use_letters) { 
                cout << static_cast<char>(matrix[i][j] + 'A'); 
            } else { 
                cout << matrix[i][j]; 
            } 
        } 
        cout << endl; 
    } 
    cout << endl; 
}

void PinkFloyd(long** intermediate, long** char_matrix, int value){
    for(int k = 0; k < value; k++){
        for(int i = 0; i < value; i++){
            for(int j = 0; j < value; j++){
                if(intermediate[i][k] < INF && intermediate[k][j] < INF){
                    long temp = intermediate[i][j];
                    intermediate[i][j] = min(intermediate[i][j], intermediate[i][k] + intermediate[k][j]);

                    if(i != j && temp != intermediate[i][j]){
                        char_matrix[i][j] = (long)(k);
                    }
                }
            }
        }
    }
}

void DisplayTransition(long** intermediate, long** char_matrix, int value){
    for(int i = 0; i < value; i++){
        for(int j = 0; j < value; j++){
            cout << static_cast<char>(i + 'A') << " -> " << static_cast<char>(j + 'A') << ", distance: ";
            
            if(intermediate[i][j] < INF){
                cout << intermediate[i][j] << ", path: ";

                if(i == j){
                    cout << static_cast<char>(i + 'A') << endl;
                }

                else{
                    RecurseTransition(i, j, char_matrix); 
                    for(size_t i = 0; i < path.size(); i++){
                        cout << static_cast<char>(path.at(i) + 'A') << " -> ";
                    }
                    cout << static_cast<char>(j + 'A') << endl;
                    path.clear();
                }
            }

            else{
                cout << "infinity, path: none" << endl;
            }
            
        }
    }
}

int main(int argc, char *argv[]) {
    // IMPORTANT VARIABLES
    // Make sure the right number of command line arguments exist.
    int validAscii = 0;
    int value;
    vector<int> rows, columns;
    vector<long> weights;

    if (argc != 2) {
        cerr << "Usage: " << argv[0] << " <filename>" << endl;
        return 1;
    }

    // Create an ifstream object.
    ifstream input_file(argv[1]);
    // If it does not exist, print an error message.
    if (!input_file) {
        cerr << "Error: Cannot open file '" << argv[1] << "'." << endl;
        return 1;
    }
    // Add read errors to the list of exceptions the ifstream will handle.
    input_file.exceptions(ifstream::badbit);
    string line;
    try {
        unsigned int line_number = 1;
        while (getline(input_file, line)){
            // You might wanna delete this later, but good for debugging 
            //cout << line_number << ":\t" << line << endl;
            if (line_number == 1){
                for(size_t i = 0; i < line.length(); i++){
                    if(int(line[i]) > 57 || int(line[i]) < 48){
                        cerr << "Error: Invalid number of vertices '" << line << "' on line 1." << endl;
                        return 1;
                    }    
                }

                value = stoi(line);
                if ((value < 1) || (value > 26)){
                    cerr << "Error: Invalid number of vertices '" << value << "' on line 1." << endl;
                    return 1; 
                }
                validAscii = 65 + value;
            }
            
            else{
                int countSpace = count(line.begin(), line.end(), ' ');
                if (countSpace != 2){
                    cerr << "Error: Invalid edge data '" << line << "' on line " << line_number << "." << endl;
                    return 1; 
                }

                int i = 0;
                while(i < 2){
                    
                    string yourAss = line.substr(0, line.find(" "));
                    if((yourAss.length()) > 1 || (int(yourAss[0]) < 65 || int(yourAss[0]) > validAscii) ){ 
                        if (i == 0){
                            cerr << "Error: Starting vertex '" << yourAss <<"' on line " << line_number << " is not among valid values " << char(65) << "-" << char(validAscii - 1) << "." << endl;
                            return 1;
                        }
                        
                        if (i == 1){
                            cerr << "Error: Ending vertex '" << yourAss <<"' on line " << line_number << " is not among valid values " << char(65) << "-" << char(validAscii - 1) << "." << endl;
                            return 1; 
                        }   
                    }
                    if(i == 0){
                        rows.push_back((int)yourAss[0] - 65);
                    }
                    else if(i == 1){
                        columns.push_back((int)yourAss[0] - 65);
                    }

                    line = line.erase(0, line.find(" ") + 1);
                    i++;
            
                } 
                
                // Throws error if last line is less than year.
                for(size_t i = 0; i < line.length(); i++){
                    if(int(line[i]) > 57 || int(line[i]) < 48){
                        cerr << "Error: Invalid edge weight '" << line << "' on line " << line_number << "." << endl;
                        return 1;
                    }
                }

                int weight = stoi(line);
                if(weight <= 0){
                    cerr << "Error: Invalid edge weight '" << weight << "' on line " << line_number << ".";
                    return 1;
                }
                weights.push_back(weight);

            }
            ++line_number;
        }
            
        // Don't forget to close the file.
        input_file.close();
    }
     catch (const ifstream::failure &f) {
        cerr << "Error: An I/O error occurred reading '" << argv[1] << "'.";
        return 1;
    }
    
    // Original Distance Matrix
    long** distancematrix = new long*[value];
    for(int i = 0; i < value; i++){
        distancematrix[i] = new long[value];
        for(int j = 0; j < value; j++){
            if(i == j){
                distancematrix[i][j] = 0;
            }
            else{
                distancematrix[i][j] = INF; 
                }
            }
    }

    for(size_t i = 0; i < rows.size(); i++){
        distancematrix[rows[i]][columns[i]] = weights[i]; 
    }
    
    // Intermediary Matrix to run calculations on
    long** tempmatrix = new long*[value];
    for(int i = 0; i < value; i++){
        tempmatrix[i] = new long[value];
        for(int j = 0; j < value; j++){
           tempmatrix[i][j] = distancematrix[i][j];
        }
    }

    // Matrix for each transition node
    long** transitionmatrix = new long*[value];
    for(int i = 0; i < value; i++){
        transitionmatrix[i] = new long[value];
        for(int j = 0; j < value; j++){
            transitionmatrix[i][j] = INF; 
        }
    }
    
    for(size_t i = 0; i < rows.size(); i++){
        distancematrix[rows[i]][columns[i]] = weights[i]; 
    }
    
    PinkFloyd(tempmatrix, transitionmatrix, value);
    display_table(distancematrix, "Distance matrix:", value, false);
    display_table(tempmatrix, "Path lengths:", value, false);
    display_table(transitionmatrix, "Intermediate vertices:", value, true); 
    DisplayTransition(tempmatrix, transitionmatrix, value);       


    // DONT FORGET GARBAGE COLLECTION
    for(int i = 0; i < value; i++){
        delete [] tempmatrix[i];
        delete [] transitionmatrix[i];
        delete [] distancematrix[i];
    }

    delete [] tempmatrix;
    delete [] transitionmatrix;
    delete [] distancematrix;
    
    return 0;
}