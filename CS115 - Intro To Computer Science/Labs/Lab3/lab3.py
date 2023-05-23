############################################################
# Name: Harris Spahic
# CS115 Lab 3
#
# Pledge: I pledge my honor I have abided by the Steven's Honor System
############################################################

from functools import reduce

# Task 1: Use reduce to add up all elements in a list
"""
Input: A list of numbers
Output A number representing the sum
Example: add_all([1, 2, 3]) = 6
"""
def add_all(lst):
    return reduce(lambda a,b: a + b, lst)            # replace this line with your code

# Task 2: Use map to evaluate a given polynomial at a specific x-value
"""
Input:
  p: A list of coefficients for increasing powers of x
  x: The value of x to evaluate
Output: Number representing the value of the evaluated polynomial
Example: poly_eval([1, 2, 3], 2) = 1(2)^0 + 2(2)^1 + 3(2)^2 = 17
"""
def poly_eval(p, x):
    def add(a,b):
        return a + b         # replace this line with your code
    def mult(a,b):
        return a * b              # replace this line with your code
    # Returns the value of x to the ith power
    def x_powers(i):
        return x**i         # replace this line with your code

    return reduce(add, map(mult, p, map(x_powers, range(len(p)))))
