/*******************************************************************************
 * Name        : waterjugpuzzle.cpp
 * Author      : Harris Spahic
 * Date        : 10/15/2021
 * Description : Water jug for 3 jugs
 * Pledge      : I pledge my honor I have abided by the Stevens Honor System.
 ******************************************************************************/

#include <iostream>
#include <sstream>
#include <queue>
#include <stack>
#include <string>
#include <vector>
using namespace std;

// Struct to represent state of water in the jugs.
struct State {
    int a, b, c;
    string directions;
    State *parent;
    
    State(int _a, int _b, int _c, string _directions) : 
        a{_a}, b{_b}, c{_c}, directions{_directions}, parent{nullptr} { }
    
    State(){};

    // String representation of state in tuple form.
    string to_string() {
        ostringstream oss;
        oss << "(" << a << ", " << b << ", " << c << ")";
        return oss.str();
    }
};

int displaySolution(State* solution){
    if(solution == nullptr){
        cout << "No solution." << endl;
        return 1;
    }
    else{
        stack<State*> temp;
        while(solution != nullptr){
            temp.push(solution);
            solution = solution->parent;
        }
        int count = 0;
        while(!temp.empty()){
            count ++;
            State* current = temp.top();
            cout << current->directions << " " << current->to_string() << endl;
            temp.pop();

        }
    }

    return 0;
}

// Performs pouring operation
State* pourWater(State* init, int pourOut, int pourIn, int capIn, int action){
    string message;
    int dif = capIn - pourIn;

    if(dif == 0 || pourOut == 0){
        return nullptr;
    }

    if(pourOut > dif){
        if(dif == 1){message = "Pour " + to_string(dif) + " gallon from ";}
        else{message = "Pour " + to_string(dif) + " gallons from ";}
        pourIn = capIn;
        pourOut -= dif;
    }
    else{
        if(pourOut == 1){message = "Pour " + to_string(pourOut) + " gallon from ";}
        else{message = "Pour " + to_string(pourOut) + " gallons from ";}
        pourIn += pourOut;
        pourOut = 0;
    }

    State* temp;    

    switch(action){
        case(1):
            // Pour from C to A
            temp = new State(pourIn, init->b, pourOut, message + "C to A.");
            break;

        case(2):
            // Pour from B to A
            temp = new State(pourIn, pourOut, init->c, message + "B to A.");
            break;
        
        case(3):
            // Pour from C to B
            temp = new State(init->a, pourIn, pourOut, message + "C to B.");
            break;

        case(4):
            // Pour from A to B
            temp = new State(pourOut, pourIn, init->c, message + "A to B.");
            break;
        
        case(5):
            // Pour from B to C
            temp = new State(init->a, pourOut, pourIn, message + "B to C.");
            break;
        
        case(6):
            // Pour from A to C
            temp = new State(pourOut, init->b, pourIn, message + "A to C.");
            break;
        
        default:
            cerr << "INVALID POUR CASE" << endl;
            exit(EXIT_FAILURE);
    }
    temp->parent = init;

    return temp;
}   

State* waterjugPblm(State ***array, int capA, int capB, int capC, int goalA, int goalB, int goalC){
    queue<State*> brnchStates;
    State* initial = new State(0, 0, capC, "Initial state.");

    brnchStates.push(initial);
    while(!brnchStates.empty()){
        State* current = (brnchStates.front());
        brnchStates.pop();
        
        //Check for goal state
        if((*current).a == goalA && (*current).b == goalB && (*current).c == goalC){
            while(!brnchStates.empty()){
                State* temp = brnchStates.front();
                delete temp;
                brnchStates.pop();
            }
            return current;
        }
        
        if(array[(*current).a][(*current).b] != nullptr){
            delete current;
            continue;
        }
        
        array[(*current).a][(*current).b] = (current);
        
        State* temp1 = pourWater(current, (*current).c, (*current).a, capA, 1);
        if(temp1 != nullptr){
            brnchStates.push(temp1);
            }
        
        State* temp2 = pourWater(current, (*current).b, (*current).a, capA, 2);
        if(temp2 != nullptr){
            brnchStates.push(temp2);
            }

        State* temp3 = pourWater(current, (*current).c, (*current).b, capB, 3);
        if(temp3 != nullptr){
            brnchStates.push(temp3);
            }
        
        State* temp4 = pourWater(current, (*current).a, (*current).b, capB, 4);
        if(temp4 != nullptr){
            brnchStates.push(temp4);
            }
        
        State* temp5 = pourWater(current, (*current).b, (*current).c, capC, 5);
        if(temp5 != nullptr) {
            brnchStates.push(temp5);
        }

        State* temp6 = pourWater(current, (*current).a, (*current).c, capC, 6);
        if(temp6 != nullptr) {
            brnchStates.push(temp6);
        }
        
    }
    return nullptr; 
}

int main(int argc, char* const argv[]){
    istringstream iss;
    int capA, capB, capC;
    int goalA, goalB, goalC;

    if(argc == 1 || argc > 7){
        cerr << "Usage: ./waterjugpuzzle <cap A> <cap B> <cap C> <goal A> <goal B> <goal C>" << endl;
        return 1;
    }
    
    iss.str(argv[1]);

    if(!(iss >> capA) || capA <= 0){
        cerr << "Error: Invalid capacity '" << argv[1] << "' for jug A." << endl;
        return 1;
    }
    
    iss.clear();
    iss.str(argv[2]);
    
    if(!(iss >> capB) || capB <= 0){
        cerr << "Error: Invalid capacity '" << argv[2] << "' for jug B." << endl;
        return 1;
    }

    iss.clear();
    iss.str(argv[3]);

    if(!(iss >> capC) || capC <= 0){
        cerr << "Error: Invalid capacity '" << argv[3] << "' for jug C." << endl;
        return 1;
    }
    
    iss.clear();
    iss.str(argv[4]);

    if(!(iss >> goalA) || goalA < 0){
        cerr << "Error: Invalid goal '" << argv[4] << "' for jug A." << endl;
        return 1;
    }
    
    iss.clear();
    iss.str(argv[5]);

    if(!(iss >> goalB) || goalB < 0){
        cerr << "Error: Invalid goal '" << argv[5] << "' for jug B." << endl;
        return 1;
    }
   
    iss.clear();
    iss.str(argv[6]);

    if(!(iss >> goalC)|| goalC < 0){
        cerr << "Error: Invalid goal '" << argv[6] << "' for jug C." << endl;
        return 1;
    }
   
    iss.clear();

    if(goalA > capA){
        cerr << "Error: Goal cannot exceed capacity of jug A." << endl;
        return 1;
    }

    else if(goalB > capB){
        cerr << "Error: Goal cannot exceed capacity of jug B." << endl;
        return 1;
    }

    else if(goalC > capC){
        cerr << "Error: Goal cannot exceed capacity of jug C." << endl;
        return 1;
    }

    if((goalA + goalB + goalC) != capC){
        cerr << "Error: Total gallons in goal state must be equal to the capacity of jug C." << endl;
        return 1;
    }

    // Make storage 2D array for checking if value has been seen
    State ***array = new State**[capA + 1];
    for(int i = 0; i <= capA; i++){
        array[i] = new State*[capB + 1];
        
        for(int j = 0; j <= capB; j++){
            array[i][j] = nullptr;
        }
    }

    State* finish = waterjugPblm(array, capA, capB, capC, goalA, goalB, goalC);
    displaySolution(finish);
    delete finish;

    for(int i = 0; i <= capA; i++){
        for(int j = 0; j <= capB; j++){
            State* temp;
            temp = array[i][j];
            delete temp; 
        }
        delete [] array[i];
    }

    delete [] array;

    return 0;
}