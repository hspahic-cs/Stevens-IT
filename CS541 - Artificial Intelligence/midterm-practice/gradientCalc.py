import matplotlib.pyplot as plt
import numpy


# Problem 3.1

# Part 1
def gradient_1(w, step):
    return (1 - step) * w

def gradient_2(w, step):
    return w - 2 * w ** 3

weights = [[1] for x in range(10)]
t = [x for x in range(50)]
for x in range(49):
    weights[0].append(gradient_1(weights[0][x], 10e-4))
    weights[1].append(gradient_1(weights[1][x], 10e-3))
    weights[2].append(gradient_1(weights[2][x], 0.01))
    weights[3].append(gradient_1(weights[3][x], 0.1))
    weights[4].append(gradient_1(weights[4][x], 0.5))
    weights[5].append(gradient_1(weights[5][x], 1))
    weights[6].append(gradient_1(weights[6][x], 2))
    weights[7].append(gradient_1(weights[7][x], 5))
    weights[8].append(gradient_1(weights[8][x], 10))
    weights[9].append(gradient_1(weights[9][x], 100))


# plt.plot(t, weights[0], color='red', label = "Step = 10e-4")
# plt.plot(t, weights[1] , color='blue', label = "Step = 10e-3")
# plt.plot(t, weights[2], color='green', label = "Step = 0.01")
# plt.plot(t, weights[3], color='orange', label = "Step = 0.1")
# plt.plot(t, weights[4], color='purple', label = "Step = 0.5")
# plt.plot(t, weights[5], color='yellow', label = "Step = 1")
# plt.plot(t, weights[6], color='coral', label = "Step = 2")
#plt.plot(t, weights[7], color='black', label = "Step = 5")

# #Part 2

weights = [[1] for x in range(10)]
t = [x for x in range(50)]
for x in range(49):
    weights[0].append(gradient_2(weights[0][x], 10e-4))
    weights[1].append(gradient_2(weights[1][x], 10e-3))
    weights[2].append(gradient_2(weights[2][x], 0.01))
    weights[3].append(gradient_2(weights[3][x], 0.1))
    weights[4].append(gradient_2(weights[4][x], 0.5))
    weights[5].append(gradient_2(weights[5][x], 1))
    weights[6].append(gradient_2(weights[6][x], 2))
    weights[7].append(gradient_2(weights[7][x], 5))
    weights[8].append(gradient_2(weights[8][x], 10))
    # weights[9].append(gradient_2(weights[9][x], 100))

plt.plot(t, weights[0], color='red', label = "Step = 10e-4")
plt.plot(t, weights[1] , color='blue', label = "Step = 10e-3")
plt.plot(t, weights[2], color='green', label = "Step = 0.01")
plt.plot(t, weights[3], color='orange', label = "Step = 0.1")
plt.plot(t, weights[4], color='purple', label = "Step = 0.5")
plt.plot(t, weights[5], color='yellow', label = "Step = 1")
plt.plot(t, weights[6], color='coral', label = "Step = 2")
plt.plot(t, weights[7], color='black', label = "Step = 5")

plt.show()