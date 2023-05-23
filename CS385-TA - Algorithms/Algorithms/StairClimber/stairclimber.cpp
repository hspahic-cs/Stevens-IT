/*******************************************************************************
 * Name        : stairclimber.cpp
 * Author      : Harris Spahic
 * Date        : 10/2/2021
 * Description : Lists the number of ways to climb n stairs.
 * Pledge      : I pledge my honor I have abided by the Stevens Honor System.
 ******************************************************************************/
#include <iostream>
#include <vector>
#include <algorithm>
#include <sstream>
#include <iomanip>

using namespace std;

vector< vector<int> > get_ways(int num_stairs) {
    // TODO: Return a vector of vectors of ints representing
    // the different combinations of ways to climb num_stairs
    // stairs, moving up either 1, 2, or 3 stairs at a time.
    vector<vector<int>> current;
    vector<vector<int>> total;
    if (num_stairs == 0){
        return {{}};
    }

    for(int i = 1; i < 4; i++){
        if(num_stairs >= i){
            current = get_ways(num_stairs - i); 
            for(int j = 0; j < (int)current.size(); j++){
                current[j].push_back(i);
                rotate(current[j].begin(), current[j].end() - 1,  current[j].end());
            }   
            total.insert(total.end(), current.begin(), current.end());
        }
    }
    return total;
}

void display_ways(const vector< vector<int> > &ways) {
    // TODO: Display the ways to climb stairs by iterating over
    // the vector of vectors and printing each combination
    int width = 1;

    for(int n = 0; n < (int)ways.size(); n++){
        if((int)ways.size() > 9){
            width = 2;
        }
        if((int)ways.size() > 99){
            width = 3;
        }
        cout << setw(width) << n + 1 << "."; 
        cout << " " << "[";
        for(int i = 0; i < (int)ways[n].size(); i++){
            if(i + 1 < (int)ways[n].size()){
                cout << ways[n][i] << ", ";
            }
            else{
                cout << ways[n][i];
            }
        }
        cout << "]" << endl;
    }
}

int main(int argc, char * const argv[]) {
    int stairs;
    istringstream iss;

    if (argc == 1|| argc > 2){
        cerr << "Usage: ./stairclimber <number of stairs>" << endl;
        return 1;
    }
    
    iss.str(argv[1]);

    if(!(iss >> stairs) || stairs < 0){
        cerr << "Error: Number of stairs must be a positive integer." << endl;
        return 1;
    }

    vector<vector<int>> ways = get_ways(stairs);
    if((int)ways.size() == 1){
        cout << ways.size() << " way to climb " << stairs << " stair." << endl;
        display_ways(ways);
    }
    else{
        cout << ways.size() << " ways to climb " << stairs << " stairs." << endl;
        display_ways(ways);
    }
    return 0;
}
