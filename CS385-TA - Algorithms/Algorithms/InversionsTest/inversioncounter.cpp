/*******************************************************************************
 * Name        : inversioncounter.cpp
 * Author      : Harris Spahic
 * Version     : 1.0
 * Date        : 10/25/21
 * Description : Counts the number of inversions in an array.
 * Pledge      : "I pledge my honor I have abided by the Stevens Honor's System."
 ******************************************************************************/
#include <iostream>
#include <algorithm>
#include <sstream>
#include <vector>
#include <cstdio>
#include <cctype>
#include <cstring>

using namespace std;

// Function prototype.
static long mergesort(int array[], int scratch[], int low, int high);
static long merge(int array[], int scratch[], int low, int mid, int high);

/**
 * Counts the number of inversions in an array in theta(n^2) time.
 */
long count_inversions_slow(int array[], int length) {
    long count = 0;
    for(int i = 0; i < length; i++){
        for(int j = i+1; j < length; j++){
            if(array[i] > array[j]){
                count++;
            }
        }
    }
    return count;
}

/**
 * Counts the number of inversions in an array in theta(n lg n) time.
 */
long count_inversions_fast(int array[], int length) {
    // TODO
    // Hint: Use mergesort!
    int* temp = new int[length];
    long count = mergesort(array, temp, 0, length - 1);
    delete[] temp;
    return count;
}

static long mergesort(int array[], int scratch[], int low, int high) {
    long sum = 0;
    if(low < high){
        int mid = low + (high - low) / 2;
        
        sum += mergesort(array, scratch, low, mid);
        sum += mergesort(array, scratch, mid + 1, high);
        sum += merge(array, scratch, low, mid + 1, high);
    }
    
    return sum;
}

static long merge(int array[], int scratch[], int low, int mid, int high){
    int i1 = low, i2 = mid, i = low;
    long sum = 0;
    while(i1 <= (mid -1) && i2 <= high){
        if(array[i1] <= array[i2]){
            scratch[i++] = array[i1++];
        }
        else{
            sum += (mid - i1);
            scratch[i++] = array[i2++];
        }
    }
    for(int j = i1; j <= mid - 1; j++){
        scratch[i++] = array[i1++];
    }
    for(int k = i2; k <= high; k++){
        scratch[i++] = array[i2++];
    }
    for(int temp = low; temp <= high; temp++){
        array[temp] = scratch[temp];
    }

    return sum;
}

int main(int argc, char *argv[]) {
    // TODO: parse command-line argument
    string speed;
    istringstream iss;
    
    if(argc == 1){
        speed = "fast";    
    }

    else if(argc > 2){
        cerr << "Usage: ./inversioncounter [slow]" << endl;
        return 1;
    }
    
    else{
        iss.str(argv[1]);
        if(!(iss >> speed)){
            cerr << "Usage: ./inversioncounter [slow]" << endl;
            return 1;
        }
        if(speed != "slow"){
            cerr << "Error: Unrecognized option '" <<  speed << "'." << endl;
            return 1;
        }
        iss.clear();
    }
    
    cout << "Enter sequence of integers, each followed by a space: " << flush;

    
    int value, index = 0;
    vector<int> values;
    string str;
    str.reserve(11);
    char c;
    while (true) {
        c = getchar();
        const bool eoln = c == '\r' || c == '\n';
        if (isspace(c) || eoln) {
            if (str.length() > 0) {
                iss.str(str);
                if (iss >> value) {
                    values.push_back(value);
                } else {
                    cerr << "Error: Non-integer value '" << str
                         << "' received at index " << index << "." << endl;
                    return 1;
                }
                iss.clear();
                ++index;
            }
            if (eoln) {
                break;
            }
            str.clear();
        } else {
            str += c;
        }
    }

    if(values.size() == 0){
        cerr << "Error: Sequence of integers not received." << endl;
        return 1;
    }

    // TODO: produce output
    if(speed == "fast"){
        cout << "Number of inversions: " << count_inversions_fast(&values[0], values.size()) << endl;
    }

    else{
        cout << "Number of inversions: " << count_inversions_slow(&values[0], values.size()) << endl;

    }
    
    return 0;
}
