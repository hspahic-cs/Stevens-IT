import numpy as np
import matplotlib.pyplot as plt
from sklearn import svm
from sklearn.datasets import make_blobs

# we create 40 separable points
X = np.array([[4,2.9],[4,4], [1,2.5], [2.5, 1], [4.9,4.5], [1.9,1.9], [3.5, 4], [0.5, 1.5], [2,2.1], [4.5, 2.5]])
y = np.array([1,1,-1,-1,1,-1,1,-1,-1,1])

print(X[0])
for i, x in enumerate(X): 
    print(f"X{i+1} = {0.846*x[0] + 0.3852*x[1] - 3.501}")

# fit the model, don't regularize for illustration purposes
clf = svm.SVC(kernel="linear", C=1000)
clf.fit(X, y)

plt.scatter(X[:, 0], X[:, 1], c=y, s=30, cmap=plt.cm.Paired)

# plot the decision function
ax = plt.gca()
xlim = ax.get_xlim()
ylim = ax.get_ylim()

# create grid to evaluate model
xx = np.linspace(xlim[0], xlim[1], 30)
yy = np.linspace(ylim[0], ylim[1], 30)
YY, XX = np.meshgrid(yy, xx)
xy = np.vstack([XX.ravel(), YY.ravel()]).T
Z = clf.decision_function(xy).reshape(XX.shape)

# plot decision boundary and margins
ax.contour(
    XX, YY, Z, colors="k", levels=[-1, 0, 1], alpha=0.5, linestyles=["--", "-", "--"]
)
# plot support vectors
ax.scatter(
    clf.support_vectors_[:, 0],
    clf.support_vectors_[:, 1],
    s=100,
    linewidth=1,
    facecolors="none",
    edgecolors="k",
)
plt.show()

print('weights: ')
print(clf.coef_)
print('Intercept: ')
print(clf.intercept_)
