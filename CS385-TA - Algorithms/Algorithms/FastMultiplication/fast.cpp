/*******************************************************************************
 * Name        : fast.cpp
 * Author      : Harris Spahic
 * Date        : 11/23/2021
 * Description : Fast multiplication of 50000 character strings.
 * Pledge      : "I pledge my honor I have abided by the Stevens Honor System"
 ******************************************************************************/

#include <iostream>
#include <cctype>
#include <sstream>
#include <string>
#include <algorithm>


using namespace std;

string sheepShaver(const string& a){
    string result;
    size_t x = 0;

    while(a[x] == '0'){
        x++;
    }
    for(size_t i = x; i < a.size(); i++){
        result+= a[i];
    }

    if(result.size() == 0){
        result += '0';
    }

    return result;
}
bool isGreater(const string& a, const string& b){
    if(a.size() > b.size()){
        return true;
    }
    else if(a.size() < b.size()){
        return false;
    }
    else{
        for(size_t i = 0; i < a.size(); i++){
            if(a[i] > b[i]){
                return true;
            }
            else if(a[i] < b[i]){
                return false;
            }
        }
    }
    return false;
}
string add(const string& a, const string& b) {
    
    string result;
    int temp;
    int carry = 0;
    size_t offset = 0;

    if(a.size() > b.size()){
        // Put all greater order numbers to front of result
        offset = a.size() - b.size();
        for(size_t i = b.size(); i > 0; i--){
            temp = (a[i + offset - 1] - '0') + (b[i - 1] - '0') + carry;
            
            carry = 0;
            if(temp >= 10){
                carry = 1;
                temp -= 10;
            }
            result.insert(0, 1, ('0' + temp));
        }
        
        for(size_t j = offset; j > 0; j--){
            temp = (a[j - 1] - '0') + carry;

            carry = 0;
            if(temp >= 10){
                carry = 1;
                temp -= 10;
            }
            result.insert(0, 1, ('0' + temp));
        }
    }

    else{
        // Put all greater order numbers to front of result
        offset = b.size() - a.size();
        for(size_t i = a.size(); i > 0; i--){
            temp = (a[i - 1] - '0') + (b[i + offset - 1] - '0') + carry;
            
            carry = 0;
            if(temp >= 10){
                carry = 1;
                temp -= 10;
            }
            result.insert(0, 1, ('0' + temp));
        }
        
        for(size_t j = offset; j > 0; j--){
            temp = (b[j - 1] - '0') + carry;

            carry = 0;
            if(temp >= 10){
                carry = 1;
                temp -= 10;
            }
            result.insert(0, 1, ('0' + temp));
        }
    }

    if(carry == 1){
        result.insert(0, 1, '1');
    }
    
    return result;    
}
string subtract(const string& a, const string& b) { 
    
    string result;
    int temp, dif;
    int carry = 0;
    size_t offset = 0;

    if(a.size() > b.size()){
        // Put all greater order numbers to front of result
        offset = a.size() - b.size();
        for(size_t i = b.size(); i > 0; i--){
            dif = (a[i + offset - 1] - '0') - (b[i - 1] - '0')+ carry;

            if(dif >= 0){
                carry = 0;
            }
            else{
                dif += 10;
                carry = -1;
            }

            result.insert(0, 1, ('0' + dif));
        }
        
        for(size_t j = offset; j > 0; j--){
            temp = (a[j - 1] - '0') + carry;
            carry = 0;
            result.insert(0, 1, ('0' + temp));
        }
    }

    else if(a.size() < b.size()){
        // Put all greater order numbers to front of result
        offset = b.size() - a.size();
        for(size_t i = a.size(); i > 0; i--){
            dif = (b[i + offset - 1] - '0') - (a[i - 1] - '0')+ carry;
            
            if(dif >= 0){
                carry = 0;
            }
            else{
                dif += 10;
                carry = -1;
            }

            result.insert(0, 1, ('0' + dif));
        }
        
        for(size_t j = offset; j > 0; j--){
            temp = (b[j - 1] - '0') + carry;
            carry = 0;
            result.insert(0, 1, ('0' + temp));
        }
    }
    
    else{
        if(isGreater(a, b)){
            for(size_t i = a.size(); i > 0; i--){
                dif = (a[i + offset - 1] - '0') - (b[i - 1] - '0') + carry;
                
                if(dif >= 0){
                    carry = 0;
                }
                else{
                    dif += 10;
                    carry = -1;
                }

                result.insert(0, 1, ('0' + dif));
            }
        }
        else{
             for(size_t i = a.size(); i > 0; i--){
                dif = (b[i + offset - 1] - '0') - (a[i - 1] - '0')+ carry;

                if(dif >= 0){
                    carry = 0;
                }
                else{
                    dif += 10;
                    carry = -1;
                }

                result.insert(0, 1, ('0' + dif));
            }
        }   
    }

    return result;   
}
string multiply(const string& a, const string& b) {
    
    // String fixup 
    string padded_a, padded_b, result1, result2, result3;;
    if(a.size() > b.size()){
        while(padded_b.size() + b.size() < a.size()){
            padded_b += '0';
        }
    }
    else if(a.size() < b.size()){
        while(padded_a.size() + a.size() < b.size()){
            padded_a += '0';
        }
    }

    padded_a += a;
    padded_b += b;

    if((int(padded_a.size()) & 1)){
        padded_a.insert(0, 1, '0');
        padded_b.insert(0, 1, '0');
    }

    
    // Base case (strings both length 1, skips fixup)
    if(b.size() == 1 && a.size() == 1){
        return sheepShaver(to_string((a[0] - '0') * (b[0] - '0')));
    }

    size_t mid_a, mid_b;
    mid_a = padded_a.size() / 2;
    mid_b = padded_b.size() / 2;

    // Where multiplication is divided into 4 parts 
    //   a b
    // x c d
    // ======
    // Result 
    
    string a_num = padded_a.substr(0, mid_a);
    string b_num = padded_a.substr(mid_a, mid_a);
    string c_num = padded_b.substr(0, mid_b);
    string d_num = padded_b.substr(mid_b, mid_b);

    string temp1, temp2;
 
    result1 = multiply(a_num, c_num);
    result1 = sheepShaver(result1);

    result2 = multiply(b_num, d_num);
    result2 = sheepShaver(result2);

    temp1 = add(a_num, b_num);
    temp2 = add(c_num, d_num);

    result3 = multiply(temp1, temp2);
    result3 = subtract(subtract(result3, result2), result1); 
    result3 = sheepShaver(result3);
    
    result1.insert(result1.size(), (int)padded_a.size(), '0');
    result3.insert(result3.size(), (int)mid_b, '0');
    return add(add(result1, result2), result3);
}


int main(int argc, char * const argv[]) {
    // TODO: reads and parses command line arguments.
    // Calls other functions to produce correct output.
    string num1, num2, result;
    istringstream iss;

    if(argc == 1 || argc > 3){
        cerr << "Usage: ./unique <string> <string>" << endl;
        return 1;
    }

    iss.str(argv[1]);
    if(!(iss >> num1)){
        cerr << "Incorrect variable type for num1" << endl;
        return 1;
    }

    iss.clear();
    iss.str(argv[2]);
    if(!(iss >> num2)){
        cerr << "Incorrect variable type for num2" << endl;
        return 1;
    }
    result = add(num1, num2);
    
    cout << sheepShaver(multiply(num1, num2)) << endl;
    //cout << sheepShaver(subtract(num1, num2)) << endl;

    return 0;
}
