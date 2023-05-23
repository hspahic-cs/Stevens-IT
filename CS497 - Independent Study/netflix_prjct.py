import numpy as np
import pandas as pd

filepath = 'data/ml-1m/ratings.dat'

with open(filepath, 'r') as file:
    data_str = file.read()

delim = "::"
data_str = data_str.replace(delim, ",")

data = np.loadtxt(data_str.splitlines(), delimiter=",")
data = data[:, 0:3]
print(data.shape)

total_data = np.array(())
for datapoint in data:
    print(datapoint)
#3952