####################################################################################
# Name: Harris Spahic
# Pledge: I pledge my honor that I have abided by the Stevens Honor System.
####################################################################################


# The binary format you'll be working with for this assignment is called R2L,
# as it is a right-to-left representation.
####################################################################################
## Ex: 8 in decimal is 1000 in standard binary (2^3),
## and represented as a list [0, 0, 0, 1] in our R2L representation.
####################################################################################

# Notice that this makes it very easy to work with binary,
# by using num[0] to grab the least significant bit (2^0)!
#
# Please fill out the following 4 functions below using recursion, as specified.

# Given an integer x >= 0, convert it to the R2L binary format.
# Take note that both [] and [0] are used to represent 0 in R2L
def decimalToBinary(x):
    if x == 0:
        return []

    elif x % 2 == 1:
        return [1] + decimalToBinary(int(x/2))

    else:
        return [0] + decimalToBinary(int(x/2))


# Given an R2L formatted number, return the integer it is equivalent to.
# The function should function with both [] and [0] returning 0.
def binaryToDecimal(num):
   if num == []:
       return 0
   elif num[-1] == 1:
       return binaryToDecimal(num[:len(num) - 1]) + 2 ** (len(num) - 1)
   else:
       return binaryToDecimal(num[:len(num) - 1])

# Given an R2L formatted number, return an R2L equivalent to num + 1
# If you need to increase the length, do so. Again, watch out for 0
def incrementBinary(num):
   if num == []:
       return num + [1]
   elif num[0] == 0:
       num[0] += 1
       return num
   else:
       return [0] + incrementBinary(num[1:])


# Given 2 R2L numbers, return their sum.
## You MUST implement recursively the algorithm for bit-by-bit addition as taught in class,
## you may NOT do something like decimalToBinary( binaryToDecimal(num1) + binaryToDecimal(num2) ).
# Make sure to figure out what to do when num1 and num2 aren't of the same length!
# (and be sure you can add [] and [0])
## Tip: Try this on paper before typing it up
def addBinary(num1, num2):
    if len(num1) > len(num2):
        larger = num1
        smaller = num2
    else:
        larger = num2
        smaller = num1

    if num1 == []:
       return num2
    elif num2 == []:
       return num1
    elif num1[0] + num2[0] >= 2:
       if len(smaller) == 1:
           if len(larger) == 1:
               return [1] + addBinary(larger[1:],smaller[1:])
           else:
               return [(larger[0] + smaller[0]) % 2] + addBinary(incrementBinary(larger[1:]), smaller[1:])
       else:
           larger[1]+=1
           return [(larger[0] + smaller[0]) % 2] + addBinary(larger[1:], smaller[1:])
    else:
        return [(num1[0] + num2[0])] + addBinary(larger[1:], smaller[1:])
