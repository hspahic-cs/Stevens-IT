import tensorflow as tf
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn import preprocessing

iris_ds = pd.read_csv('iris.csv')

# Split into features & classifications
X = iris_ds.drop(columns = ['species']).copy()
y = iris_ds[['species']]

# Normalize data
X = preprocessing.normalize(X, axis=0)

# Use OneHotEncoder to fully classify data
ohe = preprocessing.OneHotEncoder()
y = ohe.fit_transform(y).toarray()

# Split between training, testing and validation
X_train, X_rem, y_train, y_rem = train_test_split(X, y, test_size=0.2, random_state= 0, stratify=y)
X_valid, X_test, y_valid, y_test = train_test_split(X_rem, y_rem, test_size=0.5)

# Create Neural Net model with two dense layers
model = tf.keras.Sequential([
    tf.keras.layers.Dense(16, activation='relu'),
    tf.keras.layers.Dense(3, activation='softmax')
])

# Compile model with optimizer and loss
model.compile(optimizer='adam',
              loss=tf.keras.losses.CategoricalCrossentropy(),
              metrics=['accuracy'])

# Fit Neural Network to data & print test accuarcy
model.fit(X_train, y_train, batch_size=10, epochs=150, validation_data = (X_valid, y_valid))

training_loss, training_acc = model.evaluate(X_train, y_train, verbose = 2)
validation_loss, validation_acc = model.evaluate(X_valid, y_valid, verbose = 2)
test_loss, test_acc = model.evaluate(X_test, y_test, verbose=2)

print('\nTraining Accuracy: ', training_acc)
print('Validation Accuracy: ', validation_acc)
print('Test Accuracy: ', test_acc)
