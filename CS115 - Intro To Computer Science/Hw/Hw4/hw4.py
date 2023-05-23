####################################################################################
# Name: Harris Spahic
# Pledge: I pledge my honor that I have abided by the Stevens Honor System
####################################################################################
from random import randrange

def change(amount, coins):
    # sort coins from smallest to largest
    if coins != sorted(coins):
        return change(amount, sorted(coins))

    # removes all coins larger than the amount we are trying to make
    if coins[-1] > amount:
        return change(amount, coins[:-1])

    def shave(amount, coins, index, orig, sum, count):
        # if all coins go in perfectly --> return the sum of coin numbers used
        if amount == 0:
            return count

        # if every possibility of coins is exhausted, return '''inf'''
        elif coins == []:
            return float('''inf''')

        # if can't use the largest coin, remove it from the list and repeat process
        elif (index == (len(coins) - 2) and amount == orig):
            if len(coins) == 1:
                return shave(amount, coins[:-1], index, orig, sum, 0)
            else:
                return shave(amount, coins[:-1], index, orig, sum, int(amount/coins[-2]))

        # if we used all the coins and there is still some remainder (amount != 0), reset the sum, use one less largest coin and repeat
        elif index < 0:
            return shave(orig, coins, len(coins) - 1, orig, 0, count-1) - sum

        # if we are refrencing the last element --> remove largest coin from amount = count times
        elif index == len(coins) - 1:
            return shave(orig - coins[-1]*count, coins, index - 1, orig, 0, count)

        # if coin is less than the remaining amount --> subtract out as many as possible and count # of times this is done
        elif amount >= coins[index]:
            x = int(amount / coins[index])
            return shave(amount-coins[index] * x, coins, index - 1, orig, sum + x, count) + x

        # else move onto the next coin
        else:
            return shave(amount, coins, index - 1, orig, sum, count)

    return shave(amount, coins, len(coins) - 1, amount, 0, int(amount / coins[-1]))

def currency(length):
    return list(map(randrange, (map(lambda x: x * 5, range(0,length-1))), (map(lambda x: x * 5, range(1, length)))))
