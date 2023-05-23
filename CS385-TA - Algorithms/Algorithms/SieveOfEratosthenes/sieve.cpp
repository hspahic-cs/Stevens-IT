/*******************************************************************************
 * Name        : sieve.cpp
 * Author      : Harris Spahic
 * Date        : 09/15/2021
 * Description : Sieve of Eratosthenes
 * Pledge      :
 ******************************************************************************/
#include <cmath>
#include <iomanip>
#include <iostream>
#include <sstream>

using namespace std;

class PrimesSieve {
public:
    PrimesSieve(int limit);

    // Destructor automatically called
    ~PrimesSieve() {
        delete [] is_prime_;
    }

    int num_primes() const {
        return num_primes_;
    }

    void display_primes() const;

private:
    // Instance variables
    bool * const is_prime_;
    const int limit_;
    int num_primes_, max_prime_;

    // Method declarations
    int count_num_primes() const;
    void sieve();
    static int num_digits(int num);
};

PrimesSieve::PrimesSieve(int limit) :
        is_prime_{new bool[limit + 1]}, limit_{limit} {
    sieve();
    num_primes_ = count_num_primes();
}

void PrimesSieve::display_primes() const {
    // TODO: write code to display the primes in the format specified in the
    // requirements document.
    const int max_prime_width = num_digits(max_prime_),
              primes_per_row = 80 / (max_prime_width + 1);

    int cur_num_primes = 0;
    cout << "Primes up to " << limit_  << ":" << endl;
    
    float number_rows = num_primes_ / primes_per_row;  


    if (number_rows > 1){
        for(int i = 2; i < limit_ + 1; i++){
            if(is_prime_[i]){
                cur_num_primes++;
                if(cur_num_primes == num_primes_){
                    cout << setw(max_prime_width) << i;
                }
                else if(cur_num_primes % primes_per_row == 0){
                    cout << setw(max_prime_width) << i << endl;
                }
                
                else{
                    cout << setw(max_prime_width) << i << " ";
                }
            }
        }
    }
    else{
        for(int i = 2; i < limit_ + 1; i++){
            if(is_prime_[i]){
                cur_num_primes++;
                if(cur_num_primes == num_primes_){
                    cout << i;
                }
                else if (cur_num_primes % primes_per_row == 0){
                    cout << i << endl;
                }
                else{
                    cout << i << " ";
                }
            }
        }    
    }
}

int PrimesSieve::count_num_primes() const {
    // TODO: write code to count the number of primes found
    int count = 0;
    for(int i = 2; i < limit_ + 1; i++){
        //cout << i << " : "  << is_prime_[i] << endl;
        if(is_prime_[i]){
            count++;
        }
    }

    return count;
}

void PrimesSieve::sieve() {
    // TODO: write sieve algorithm
    const int n_root = sqrt(limit_);
    
    for(int i = 2; i < limit_ + 1; i++){
        is_prime_[i] = 1;
    }

    for(int i = 2; i <= n_root; i++){
        if (is_prime_[i]){
            for(int j = i*i; j < limit_ + 1; j += i){
                is_prime_[j] = 0;
            }
        }
    }

    int current_index = limit_;

    while(!is_prime_[current_index]){
        current_index--;
    }

    max_prime_ = current_index;
}

int PrimesSieve::num_digits(int num) {
    // TODO: write code to determine how many digits are in an integer
    // Hint: No strings are needed. Keep dividing by 10.
    int numDigits = 0;
    while(num > 0){ 
        num /= 10;
        numDigits++;
    }
    
    return numDigits;
}

int main() {
             
    cout << "**************************** " <<  "Sieve of Eratosthenes" <<
            " ****************************" << endl;
    cout << "Search for primes up to: ";
    string limit_str;
    cin >> limit_str;
    int limit;

    // Use stringstream for conversion. Don't forget to #include <sstream>
    istringstream iss(limit_str);

    // Check for error.
    if ( !(iss >> limit) ) {
        cerr << "Error: Input is not an integer." << endl;
        return 1;
    }
    if (limit < 2) {
        cerr << "Error: Input must be an integer >= 2." << endl;
        return 1;
    }

    // TODO: write code that uses your class to produce the desired output.
    PrimesSieve mySieve(limit); 
    cout << endl;
    cout << "Number of primes found: " << mySieve.num_primes() << endl;
    mySieve.display_primes();
    cout << endl;
    

    return 0;
}
