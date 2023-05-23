from lab1_functions import draw_shape, check_num, check_magnitude
from math import sqrt

# Task 0: Print your name and honor pledge
print("Harris Spahic")
print("I pledge my honor that I have abided by the Stevens Honor Code")

# Task 1: Mathematical operations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# Change the (+) operators to make 'num' equal to 1

# 'num' will store the result of the calculation
num = (4 - 4) + 4 / 4
check_num(num)

# Task 2: Vector magnitude ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# Calculate the magnitude of a 2D vector
# Note: 'x' and 'y' represent coordinates in a vector < x, y >
# Hint: sqrt(4) performs a square root on 4 and returns 2

x = 140.15
y = 144.75

# Replace 1.0 with your final answer
magnitude = sqrt(140.15*140.15 + 144.75 * 144.75)
check_magnitude(magnitude)

# Task 3: Drawing shapes ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# Define a list of coordinates to draw some shapes

# Here's an isosceles triangle as an example
draw_shape([
    (-100, 0),
    (100, 0),
    (0, 300),
    (-100, 0)
])

# 3.1: Equilateral triangle

x = 120
draw_shape([
    (-x , 0),
    (x , 0),
    (0, sqrt(3) * x),
    (-x, 0)
])

# 3.2: Square
draw_shape([
    (0, 0),
    (100, 0),
    (100, 100),
    (0, 100),
    (0,0)
])

# 3.3: Any shape with 5+ vertices
draw_shape([
    (-100, 0),
    (-130, 100),
    (-50, 200),
    (100, 100),
    (0, 0),
    (-100, 0)

])
