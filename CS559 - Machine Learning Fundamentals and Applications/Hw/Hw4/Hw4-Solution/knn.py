import numpy as np
from pandas import read_csv
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import confusion_matrix
from sklearn.metrics import precision_score, recall_score, f1_score, accuracy_score
from sklearn.metrics import DistanceMetric
import matplotlib.pyplot as plt

# Define inverse squared function for distance 
def ISD(distances):
    weights = []
    for d in distances:
        weight = (1 / np.sqrt(d[0] ** 2 + d[1] ** 2 + d[2] ** 2))
        weights.append([(weight / 3)]*3)
    return distances 

# Load in training & testing data
excel_data = read_csv('train.csv')
X_train = excel_data.iloc[:, :-1]
Y_train = excel_data.iloc[:, -1]

training_data = read_csv('test.csv')
X_test = training_data.iloc[:, 1:-1]
Y_test = training_data.iloc[:,-1]

# Train K-nearest-neighbors & ISD-weighted-KNN
KNN = KNeighborsClassifier(n_neighbors=3).fit(X_train, Y_train)
ISDW_KNN = KNeighborsClassifier(n_neighbors=3, weights=ISD).fit(X_train, Y_train)


# Predict on Testing set
KNN_pred = KNN.predict(X_test)
ISDW_KNN_pred = ISDW_KNN.predict(X_test)

print(f"Probabilities for KNN: \n{KNN.predict_proba(X_test)}")
print(f"Probabilities for ISDW_KNN: \n{ISDW_KNN.predict_proba(X_test)}")

print(f"Prediction for 3 nearest neighbors {KNN_pred}")
print(f"Prediction for ISD weighted KNN    {ISDW_KNN_pred}")

'''
NOTE ~ since both classifiers predict the same points, 
       they will have the same statistical data. I.e
       1. Confusion Matrix
       2. Precision
       3. Recall
       4. F-measure
       5. Accuracy
'''

# Display statistical data
KNN_conf_matrix = confusion_matrix(y_true=Y_test, y_pred=KNN_pred)
ISDW_KNN_conf_matrix = confusion_matrix(y_true=Y_test, y_pred=ISDW_KNN_pred)

print('Precision: %.3f' % precision_score(Y_test, KNN_pred))
print('Recall: %.3f' % recall_score(Y_test, KNN_pred))
print('F-measure: %.3f' % f1_score(Y_test, KNN_pred))
print('Accuracy: %.3f' % accuracy_score(Y_test, KNN_pred))

print('Precision: %.3f' % precision_score(Y_test, ISDW_KNN_pred))
print('Recall: %.3f' % recall_score(Y_test, ISDW_KNN_pred))
print('F-measure: %.3f' % f1_score(Y_test, ISDW_KNN_pred))
print('Accuracy: %.3f' % accuracy_score(Y_test, ISDW_KNN_pred))

# fig, ax = plt.subplots(figsize=(5, 5))
# ax.matshow(KNN_conf_matrix, cmap=plt.cm.Oranges, alpha=0.3)
# for i in range(KNN_conf_matrix.shape[0]):
#     for j in range(KNN_conf_matrix.shape[1]):
#         ax.text(x=j, y=i,s=KNN_conf_matrix[i, j], va='center', ha='center', size='xx-large')
 
# plt.xlabel('Predictions', fontsize=18)
# plt.ylabel('Actuals', fontsize=18)
# plt.title('KNN Confusion Matrix', fontsize=18)
# plt.show()
