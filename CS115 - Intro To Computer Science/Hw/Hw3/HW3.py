############################################################
# Name: Harris Spahic
# CS115 HW3 ~ Applications of Map & Reduce
# Due : Sep. 30th, 2020
#
# Pledge: I pledge my honor I have abided by the Steven's Honor System
############################################################


# All functions should be written using map/reduce.
# No loops, no recursion, or other built-in functions unless explicitly allowed.
# You are free to write helper functions, so long as the main functions work as intended.

from functools import reduce
from math import factorial, sqrt # this import is necessary to use sqrt and factorial.

############################################################
#
#  taylorApproxE(lastIter):
#
#  Compute an approximation of e (the base of the natural logarithm),
#  using the taylor series of e^x (around 0) when x=1.
#
#  The approximation: e = 1 + 1 + 1/2 + 1/6 + 1/24 + 1/120 + ... + 1/r! + ...
#  where r! is the factorial function: r! = r * ... * 2 * 1
#
#  The input lastIter represents the iteration after which the (infinite) Taylor series
#  should be truncated, so lastIter=0 returns only the first term in the sum, lastIter=1
#  returns only after the first iteration has occured, (aka the first two terms), and so on.
#
#  Hint: Start with range(lastIter+1) to get the list [0, 1, ..., lastIter]
#
#  Assumptions: lastIter is an nonnegative integer
#
#  Allowed functions: range(), factorial()
#
#  Examples: taylorApproxE(4) = 2.708333333333333
#            taylorApproxE(1) = 2
#
############################################################
#
# Add a suitable docstring to the function and delete this comment block
def taylorApproxE(lastIter):
    return reduce(lambda a,b: a + b, map(lambda x: 1/(factorial(x)), range(lastIter + 1)))          # replace this line with your code
                    # 'pass' tells Python that this isn't implemented yet

############################################################
#
# vectorNorm(vect1):
#
# Compute the vector norm of a list, that is, the square-root of the
# sum of the squares of the list entries.
#
# Assumptions: vect1 is a nonempty array of numbers
#
# Allowed functions: sqrt()
#
# Examples: vectorNorm([3, 5, 11, 13]) = 18.0
#           vectorNorm([1, 1, 1]) = 1.7320508076
#
############################################################
#
# Add a suitable docstring to the function and delete this comment block
def vectorNorm(vect1):
    return sqrt(reduce(lambda a,b: a+b, map(lambda x: x**2, vect1)))            # replace this line with your code



############################################################
#
# arithMean(vect1):
#
# Compute the arithmetic mean of a list of numbers. The mean of a list
# is the sum of its elements divided by the length of the list.
#
# Assumptions: vect1 is a nonempty array of numbers
#
# Allowed functions: len()
#
# Example: arithMean([4, 1, 3, 6, 12]) = 5.2
#
############################################################
#
# Add a suitable docstring to the function and delete this comment block
def arithMean(vect1):
    return reduce(lambda a,b: a+b, vect1) / len(vect1)           # replace this line with your code
