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

double sqrt(double num, double epsilon){
	if (num < 0){
		return numeric_limits<double>::quiet_NaN();
	}

	if(num == 0 || num == 1){
		return num;
	}

	double last_guess, current_guess;

	last_guess = 0;
	current_guess = num;

	while(fabs(current_guess - last_guess) > epsilon){
		double temp = current_guess;
		current_guess = (current_guess + num / current_guess) * 0.5;
		last_guess = temp;
	}

	return current_guess;

}

int main(int argc, char* argv[]) {
	double num, epsilon;
	istringstream iss;

	if(argc > 3 || argc == 1){
		cerr << "Usage: " << argv[0] << " <value> [epsilon]" << endl;
		return 1;
	}

	iss.str(argv[1]);
	if(!(iss >> num)){
		cerr << "Error: Value argument must be a double." << endl;
		return 1;
	}

	iss.clear();

	if(argc == 2){
		epsilon = 1.0e-10;
	}

	else{
		iss.str(argv[2]);
		if(!(iss >> epsilon) || epsilon <= 0){
			cerr << "Error: Epsilon argument must be a positive double." << endl;
			return 1;
		}

		iss.clear();
	}

	cout << fixed << setprecision(8) << sqrt(num, epsilon) << endl;

	return 0;
}
