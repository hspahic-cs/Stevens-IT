# Created by Prof. Nicolosi & Dominick DiMaggio for CS 115 at Stevens Institute of Technology, 2020

##########################################
# Name: Harris Spahic
# Pledge: I pledge my honor that I have abided by the Stevens Honor System.
##########################################
from math import floor

######################################################################
# Task 1: Given an 8-digit decimal number representing the date,
#         calculate the day of the week
# Input: 8-digit decimal number in the format of YYYYMMDD
# Saturday: 0, Sunday: 1... Friday: 6
# Hint: Look at Zeller's congruence.
#       The floor() function may be helpful. (Ex: floor(5.5) = 5)

def getWeekday(timestamp):
    q = timestamp % 100
    m = ((int(timestamp / 100)) % 100)
    k = ((int(timestamp / 10000)) % 100)

    if m == 1:
        m = 13
        k = ((int(timestamp / 10000) - 1) % 100)
        j = ((int(timestamp / 1000000) - 1))
    elif m == 2:
        m = 14
        k = ((int(timestamp / 10000) - 1) % 100)
        j = ((int(timestamp / 1000000) - 1))
    else:
        k = ((int(timestamp / 10000)) % 100)
        j = ((int(timestamp / 1000000)))

    print("q: {} | m: {} | k: {} | j: {}".format(q,m,k,j))

    return ((q + floor((13*(m + 1))/5) + k + floor(k/4) + floor(j/4) - 2*j) % 7)
    # TODO: Implement

######################################################################
# Task 2: For this task, you will create an encoder and decoder
#         for a Caesar cipher using the map function.
# You may find this website helpful:
# https://cryptii.com/pipes/caesar-cipher

######################################################################
# This provided helper function may be useful
# Input: List of ASCII values (Ex: [72, 69, 76, 76, 79])
# Output: String (Ex. 'HELLO')     ('H   E   L   L   O')
def asciiToString(asciiList):
    return ''.join(map(chr, asciiList))

######################################################################
# Encoder
# Input: A string value with all capital letters (leave everything
#        else as-is) and a shift value (Ex. HELLO WORLD, 3)
# Output: An encoded string            (Ex. KHOOR ZRUOG)
# Hint: The ord() function converts single-character strings to ASCII

def caesarEncoder(str, shift):
    y = [0]
    capitals = (list(map(lambda x: (x % 90) + 64 if (x >= 91) else x, map(lambda x: x + shift % 26, list(filter(lambda x: (64 < x < 91), map(ord, list(str))))))))

    def replace(x):
        if (64 < x < 91):
            x = capitals[y[0]]
            y[0] += 1
        return x

    return asciiToString(list(map(replace, map(ord, list(str)))))

     #return asciiToString(list(map(lambda x: ((x % 90) % 26) + 64 if (91 + shift > x >= 91) else x, (list(map(lambda x: x + shift if (64 < x < 91) else x, list(map(ord, list(str)))))))))


######################################################################
# Decoder
# Input: A string value with all capital letters (leave everything
#        else as-is) and a shift value (Ex. KHOOR ZRUOG, 3)
# Output: A decoded string             (Ex. HELLO WORLD)
# Hint: The chr() function converts ASCII to a single-character string
def caesarDecoder(str, shift):
    y = [0]
    capitals = (list(map(lambda x: 90 - (64 - x) if (x <= 64) else x, map(lambda x: x - shift % 26, list(filter(lambda x: (64 < x < 91), map(ord, list(str))))))))

    def replace(x):
        if (64 < x < 91):
            x = capitals[y[0]]
            y[0] += 1
        return x

    return asciiToString(list(map(replace, map(ord, list(str)))))


    #return asciiToString(list(map(lambda x: 91 - (64 - x) if (64 - shift < x <= 64) else x, (list(map(lambda x: x - shift if (64 < x < 91) else x, list(map(ord, list(str)))))))))

    # TODO: Implement
