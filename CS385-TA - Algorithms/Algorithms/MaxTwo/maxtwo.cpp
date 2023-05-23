#include <iostream>
#include <sstream>
#include <algorithm>
#include <iomanip>
using namespace std;

void pass_by_value(int k){
	k = 10;
}

void pass_by_pointer(int *k){
	*k = 10;
}

// &k just notation for pass by reference, sets k to a new name for input

void pass_by_reference(int &k){
	k = 10;

}

int main(int argc, char* arg[]){
	int x; //integer
	x=5;

	int *z; //pointer to integer
	z = &x; //stores address of x in z

	// int x = 5, *z = &x; // Single line

	cout << fixed << setprecision(8);
	cout << 0.00000034 << endl;

	// gbd please help me with pointers
	// cmd: run
	return 0;
}
