import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

# Read in the data
data = pd.read_csv('wdbc.csv')

# Remove irrelevant data (id & Unnamed will not affect prediction)
data.drop(['id', 'Unnamed: 32'], axis = 1, inplace=True)

# Change diagnosis to be numerically readable
data.diagnosis = [1 if diagn  == "M" else 0 for diagn in data.diagnosis]
y = data.diagnosis.values
x_data = data.drop(['diagnosis'], axis = 1)

# Normalize the data set 
x = (x_data - np.min(x_data)) /  (np.max(x_data) - np.min(x_data)).values

# Seperate data into training & testing sets
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)
x_train = x_train.T
x_test = x_test.T
y_train = y_train.T
y_test = y_test.T

print("x train: ", x_train.shape)
print("x test: ", x_test.shape)
print("y train: ", y_train.shape)
print("y test: ", y_test.shape)

# Logistic Funciton
def logistic_func(x):
    return 1.0/(1 + np.exp(-np.dot(x)))

# -log(Derivative of the logistic function)
def logistic_loss(y, fy):
    return -np.mean(y*np.log(fy) + (1-y)*np.log(1-fy))

# gradient of logistic function
def logistic_gradient(x, y):
    return np.dot(x.T, predictions(x) - y)/np.size(y)
    
def predictions(x, beta):
    # print(x)
    # print(beta)
    return logistic_func(np.dot(x, beta.transpose))

def stochastic_gradient_descent(x, y, steps = 100, step_size = 0.01):
    beta = np.zeros(np.shape(x)[1])
    for _ in range(steps):
        chosen_x = x[np.random.choice(x.shape[0], replace=False)]
        print(chosen_x)
        fx = predictions(chosen_x, beta)
        weight_change = logistic_gradient(chosen_x, fx) * step_size
        beta += weight_change
        print(beta)
    return logistic_loss(y, predictions(x, beta))

def mini_batch_descent(x, y, steps=100, step_size=0.01, batch_size = 0.01):
    beta = np.zeros(np.shape(x)[1])
    rows = x.shape([0])
    for _ in range(steps):
        batch = x[np.random.choice(x.shape[0], size=(int)(rows*batch_size) ,replace=False), :]
        fx = predictions(batch, beta)
        weight_change = logistic_gradient(batch, fx) * step_size
        beta += weight_change
    return logistic_loss(y, predictions(x, beta))

'''
I wasn't able to finish the stochastic descent and minibatch code, 
I just have too much work on top of this class to manage it all. 

I do however understand the concept and will explain it. 
Hopefully that warrents some credit.

Stochastic Gradient Descent
1. Starts with an initialized array of weights
2. Runs the loss function (in this case logistic function) 
   to find out how accurate the current weights are on our data.
3. Record the loss, then find the direciton of the negative gradient using only 
   a SINGLE data point
4. Change the weights by the step-size * gradient direction
5. Repeat this until we've gotten sufficiently accurate weights to aproximate the model
   or we've run out of stepss

Mini-batch Gradient Descent
~ Almost exactly the same as Stochastic Gradient Desent except instead of 
calcultating the gradient for a single data point we take a SUBSET of datapoints and 
calculate the mean gradeint of each
'''

if __name__ == "__main__":
    print(stochastic_gradient_descent(x_train, y_train))





