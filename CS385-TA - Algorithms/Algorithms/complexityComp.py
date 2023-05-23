import csv
import json
from json.decoder import JSONDecodeError
import math
import time

DEFAULT_CORDS = []
CONST_PATH = "CONST.json"
VISUALIZER_PATH = "visualizer.csv"

'''
update_exec_time ~ calculates exec_time (if undefined) and returns exec_timeW
'''

def update_exec_time():
    data = {'exec_time':""}
    with open(CONST_PATH) as infile:
        try:
            consts = json.load(infile)
        except JSONDecodeError:
            with open(CONST_PATH, 'w') as outfile:
                json.dump(data, outfile)
                outfile.close()
            return update_exec_time()

        if(consts['exec_time']):
            return consts['exec_time']

    print("Execution time undefined. Calculating...")

    data['exec_time'] = calc_exec_time()
    print("Calculation complete.")

    with open(CONST_PATH, 'w') as outfile:
        json.dump(data, outfile)

    return data['exec_time']


'''
calc_exec_time ~ A quick and dirty script to approximate execution time of current machine (using ~ linear time operation)
'''

def calc_exec_time():
    meanOfAverages = 0
    for x in range(0, 50):
        totalTime = 0
        #Take relative larger cases
        for x in range(5, 9):
            current = time.time()
            c = 0
            for i in range(10**x):
                c += 1

            execTime = (time.time() - current) / 10**x
            totalTime += execTime
            print("Time per operation for {} : {}".format(x, execTime))

        avgTime = totalTime / 4
        meanOfAverages += avgTime
        print(avgTime)

    return (meanOfAverages / 50)
    # APPROXIMATELY = 4.0 * 10**-8 for my machine

'''
Takes in any number of functions as input
'''

def calc_cords(args*):
    if (!args):
        print("No functions have been inputted, referencing default array")
        return 

'''
//////////////////////////////////////////////////////////
                    VARIABLES CALCULATED
//////////////////////////////////////////////////////////
'''

TPE = update_exec_time()

def load_data(xCords=DEFAULT_CORDS, *args):
    fxs = fit_base(xCords, *args)
    labels = []

    for func in fxs:
        labels.append(func.pop())

    for arg in args:
        labels.append(arg.pop())
        fxs.append(arg)

    cords = list(zip(*fxs))

    with open(VISUALIZER_PATH, 'w', encoding="UTF8", newline='') as f:
        writer = csv.writer(f)
        writer.writerow(labels)
        for cord in cords:
            writer.writerow(cord)

        f.close()

    #default functions 1, logn, n, nlogn, n^2, 2^n, n!
    return 0

'''
fit_base ~ finds upper and lower bounds of function, returns 2d array with xcords, and two functio
var xCords -> Integer array X-Cordinates to be used, defaults to powers of 2
*args -> should hold arrays of functions to be fit
'''

def fit_base(xCords=DEFAULT_CORDS, *args):
    BASE_FX = calc_default(xCords)
    max = 0
    min = float('inf')

    # Finds min & max comparison values of all inputted functions
    for arr in args:
        print(arr)
        if(arr[-1] < min):
            min = arr[-1]
        if(arr[-1] > max):
            max = arr[-1]

    fxs = list(BASE_FX.keys())
    min_base = 0
    max_base = 0

    # Gets position of key with upper bound, checks from smallest to largest
    for i in range(0, len(fxs) - 1):
        # If number is found, stops at closest upper bound
        if(BASE_FX[fxs[i]][-1] >= max):
            break

        max_base += 1

    # Gets position of key with lower bound, checks from largest to smallest
    for i in range(0, len(fxs) - 1):
        # If number found, stops to keep closest lower bound
        if(BASE_FX[fxs[-i]][-1] <= min):
            break

        min_base += 1

    min_base = fxs[min_base]
    max_base = fxs[max_base]

    # If values larger than the largest base, largest base becomes lower bound
    if(max_base == len(fxs)):
        min_base = fxs[-1]
        max_base = None

    base_cords = [[xCords, "x"], []]
    base_cords[1].append(BASE_FX[min_base])
    base_cords[1].append(min_base)
    if(max_base):
        base_cords[2].append(BASE_FX[max_base])
        base_cords[2].append(max_base)

    return base_cords

'''
calculate_default ~ returns dictionary of default complexity function runtimes
var xCords --> Integer array of X-Cordinates to be used, defaults to powers of 2
'''
def calc_default(SIG, xCords=DEFAULT_CORDS):
    results = {"const": [],
               "lgn": [],
               "sqrtn": [],
               "n": [],
               "nlgn": [],
               "n^2": [],
               "2^n": [],
               "n!": []}

    def round_sig(f, p = SIG): return float(('%.' + str(p) + 'e') % f)

    for key in results:
        if(key == "const"):
            results[key] = list(map(round_sig, map(lambda a: 1 * TPE, xCords)))
        elif(key == "lgn"):
            results[key] = list(map(round_sig, map(lambda a: math.log2(a) * TPE, xCords)))
        elif(key == "sqrtn"):
            results[key] = list(map(round_sig, map(lambda a: math.sqrt(a) * TPE, xCords)))
        elif(key == "n"):
            results[key] = list(map(round_sig, map(lambda a: a * TPE, xCords)))
        elif(key == "nlgn"):
            results[key] = list(map(round_sig, map(lambda a: a*math.log2(a) * TPE, xCords)))
        elif(key == "n^2"):
            results[key] = list(map(round_sig, map(lambda a: a**2 * TPE, xCords)))
        elif(key == "2^n"):
            results[key] = list(map(round_sig, map(lambda a: 2**a * TPE, xCords)))
        elif(key == "n!"):
            results[key] = list(map(round_sig, map(lambda a: math.factorial(a) * TPE, xCords)))

    return results
