import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn import metrics
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis

############################################
        ### CODE FOR PROBLEM #1 ###
############################################

# Read in data
data = pd.read_csv('iris.csv')

#Split per group
setosa_data = data[0:50]
versicolor_data = data[50:100]
virginica_data = data[100:150]

#Create training data for each pair
setosa_versicolor = setosa_data + versicolor_data
setosa_virginica = setosa_data + virginica_data
virginica_versicolor = virginica_data + versicolor_data

# Splitting Data set into test & training
P1_train, P1_test = train_test_split(data, test_size=0.4, stratify=data['species'])
P2_train, P2_test = train_test_split(data, test_size=0.4, stratify=data['species'])
P3_train, P3_test = train_test_split(data, test_size=0.4, stratify=data['species'])

P1_X_train = P1_train[['sepal_length', 'sepal_width', 'petal_length', 'petal_width']]
P1_y_train = P1_train.species
P1_X_test = P1_test[['sepal_length', 'sepal_width', 'petal_length', 'petal_width']]
P1_y_test = P1_test.species

P2_X_train = P2_train[['sepal_length', 'sepal_width', 'petal_length', 'petal_width']]
P2_y_train = P2_train.species
P2_X_test = P2_test[['sepal_length', 'sepal_width', 'petal_length', 'petal_width']]
P2_y_test = P2_test.species

P3_X_train = P3_train[['sepal_length', 'sepal_width', 'petal_length', 'petal_width']]
P3_y_train = P3_train.species
P3_X_test = P3_test[['sepal_length', 'sepal_width', 'petal_length', 'petal_width']]
P3_y_test = P3_test.species

# Analysis and results
LDA_dt = LinearDiscriminantAnalysis()
LDA_dt.fit(P1_X_train, P1_y_train)
prediction = LDA_dt.predict(P1_X_test)
print("The accuracy of the Linear Descriminat Analysis is {:.3f}".format(
    metrics.accuracy_score(prediction, P1_y_test)))

LDA_dt.fit(P2_X_train, P2_y_train)
prediction = LDA_dt.predict(P2_X_test)
print("The accuracy of the Linear Descriminat Analysis is {:.3f}".format(
    metrics.accuracy_score(prediction, P2_y_test)))

LDA_dt.fit(P3_X_train, P2_y_train)
prediction = LDA_dt.predict(P3_X_test)
print("The accuracy of the Linear Descriminat Analysis is {:.3f}".format(
    metrics.accuracy_score(prediction, P3_y_test)))
