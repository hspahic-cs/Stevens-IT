/*******************************************************************************
 * Name    : sqrt.cpp
 * Author  : Brian S. Borowski
 * Version : 1.0
 * Date    : September 1, 2021
 * Description : Computes the square root of the command-line argument.
 * Pledge : I pledge my honor that I have abided by the Stevens Honor System.
 ******************************************************************************/


#include <iostream>
#include <iomanip>
#include <sstream>
#include <limits>
#include <cmath>
using namespace std;

void display_array(int array[], int length){
	for(int i = 0; i < length; i++){
		cout << array[i] << " ";
	}
	cout << endl;
}

void display_array_ptr(int *array, int length){
	for(int *p = array; p < *array + length; p++){
		cout << *p << " ";
	}
	cout << endl;
}

int main(int argc, char* argv[]) {

	int x;
	x = 5;
	int *values = new int[x];
	for(int i = 0; i < x; i++){
		*(values + i) = i; //Functionally
		values[i] = i;     //The Same
	}

	display_array(values, x);
	display_array_ptr(values, x);

	delete [] values; // Marked as empty

	return 0;
}
