/*******************************************************************************
 * Name        : student.cpp 
 * Author      : Harris Spahic
 * Date        : 09/09/21
 * Description : Student Class 
 * Pledge      : I pledge my honor that I have abided by the Stevens Honor System.
 * ******************************************************************************/
#include <iostream>
#include <iomanip>
#include <vector>

/*gdb "name of binary" --> run command*/

using namespace std;

class Student{
public:
    // Constructor
    Student(string first, string last, float gpa, int id) : first_{first}, last_{last}, gpa_{gpa}, id_{id} { }

    string full_name() const{
        return (first_ + " " + last_);
    }

    int id() const{
        return id_;
    }

    float gpa() const{
        return gpa_;
    }

    void print_info() const{
        cout << first_ << " " << last_ << ", GPA: " << fixed 
        << setprecision(2) << gpa_ << ", ID: " << id_ << endl;
    }
 
private:
    string first_, last_;
    float gpa_;
    int id_;
};

vector<Student> find_failing_students(const vector<Student> &students){
    vector<Student> failing_students;

    for(const auto &student: students){
        if(student.gpa() < 1.0){
        failing_students.push_back(student);
        }
    }

    if(failing_students.size() == 0){
        cout << " None" << endl;
    }

    else{
        cout << endl;
    }

    return failing_students;
}

void print_students(const vector<Student> &students){
   
    for(const auto &student: students){
        student.print_info();
    }
}

int main(){
    string first_name, last_name;
    float gpa;
    int id;
    char repeat;
    vector<Student> students;

    do {
        cout << "Enter student's first name: ";
        cin >> first_name;
        cout << "Enter student's last name: ";
        cin >> last_name;
        gpa = -1;
        while(gpa < 0 || gpa > 4) {
            cout << "Enter student's GPA (0.0-4.0): ";
            cin >> gpa;
        }
        cout << "Enter student's ID: ";
        cin >> id;
        students.push_back(Student(first_name, last_name, gpa, id));
        cout << "Add another student to database (Y/N)? ";
        cin >> repeat;
    } while (repeat == 'Y' || repeat == 'y');

    cout << endl << "All students:" << endl;
    print_students(students);

    cout << endl << "Failing students:";

    print_students(find_failing_students(students));
    
    return 0;
}