import sys
from statistics import mean
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.pyplot import style
import random

style.use('fivethirtyeight')

X = np.array([1,2,3,4,5,6], dtype=np.float64)
Y = np.array([5,4,6,5,6,7], dtype=np.float64)

def create_dataset(hm, variance, step=2, correlation = False):
    val = 1
    Y = []
    for i in range(hm):
        y = val + random.randrange(-variance, variance)
        Y.append(y)
        if correlation and correlation == 'pos':
            val+=step
        elif correlation and correlation == 'neg':
            val -= step
    X = [i for i in range(len(Y))]
    return np.array(X, dtype=np.float64), np.array(Y, dtype=np.float64)
        

def bets_fit_slope_and_intercept(X,Y):
    m = ( (mean(X)*mean(Y))-mean(X*X))/((mean(X)*mean(X))-mean(X*X))
    b = mean(Y)-m*mean(X)
    return m,b

def squared_error(Y_orig, Y_line):
    return sum((Y_line-Y_orig)**2)

def coefficient_of_determination(Y_orig, Y_line):
    Y_mean_line = [mean(Y_orig) for y in Y_orig]
    squared_error_regr = squared_error(Y_orig, Y_line)
    squared_error_y_mean = squared_error(Y_orig, Y_mean_line)
    return 1 - (squared_error_regr / squared_error_y_mean)

X,Y = create_dataset(40,40, 2, correlation= 'pos')

m,b = bets_fit_slope_and_intercept(X,Y)
regression_line = [(m*x)+b for x in X]

print(m,b)

predict_x = 8
predict_y = (m*predict_x)+b

r_squared = coefficient_of_determination(Y, regression_line)
print(r_squared)

plt.scatter(X,Y)
plt.scatter(predict_x,predict_y)
plt.plot(X, regression_line)
plt.show()

print('PyTron says Electron!')
sys.stdout.flush()