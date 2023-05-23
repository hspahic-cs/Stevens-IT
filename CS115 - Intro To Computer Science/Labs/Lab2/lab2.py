# Adapted by Dominick DiMaggio for Prof. Nicolosi's CS 115 at Stevens Institute of Technology, 2020

##########################################
# Name: Harris Spahic
# Pledge: "I pledge my honor that I have abided by the Stevens Honor System."
##########################################

# Import reduce from the functools package
from functools import reduce

#######################################################################################
# Task 1: Use reduce to determine if all elements in a boolean list are true
def all_true(lst):
    def intersection(x,y):
        return (x and y)
    return reduce(intersection, lst)

#######################################################################################
# Task 1.1: Use reduce to determine if AT LEAST one element in a boolean list is true
# Hint: Should be very similar to the above function
def one_true(lst):
    def union(x,y):
        return (x or y)
    return reduce(union, lst)
    # TODO: Implement

#######################################################################################
# Task 2: Use map and reduce to return how many elements are True in a boolean list
def count_true(lst):
    def digitize(x):
        if x:
            return 1
        else:
            return 0

    def sum(x,y):
        return (x+y)

    return (reduce(sum, (list(map(digitize, lst)))))
    # TODO: Implement

# This function is provided for you
# Gets a list of strings through the command line
# Input is accepted line-by-line
def getInput():
    lst = []
    txt = input()

    while(len(txt) != 0):
        lst.append(txt)
        txt = input()

    return lst

# Task 3: Get the longest string in the list using map and reduce, and print it out
# 'strings' is a list of input strings e.g. [ 'hello', 'world' ]
# Hint: The 'map' part of your program should take a string s into a length-2 list [len(s), s].
def getLongestString():
    strings = getInput()
    return (reduce(max,(list(map(len, strings)))))
