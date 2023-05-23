import time
import complexityComp

def sieve(upLim):
    arr = [True for x in range(upLim + 1)]
    arr[0] = False
    arr[1] = False

    for x in range(2, (int)(upLim ** (1/2)) + 1):
        if(arr[x]):
            current = x**2
            while(current <= upLim):
                if(arr[current]):
                    arr[current] = False
                current = current + x

    #display_primes(arr)

def display_primes(arr):
    for count, element in enumerate(arr):
        if(arr[count]):
            arr[count] = count

    arr = list(filter(lambda a: True if (type(a) is int) else False, arr))
    print(arr)    

def check_exec_time(n):
    start_time = time.time()
    def round_sig(f, p): return float(('%.' + str(p) + 'e') % f)
    sieve(n)
    #print("Execution time for sieve({}) : {} seconds".format(n, round_sig((time.time() - start_time), 4)))
    return round_sig((time.time() - start_time), 4)

if __name__ == "__main__":
    values = []
    for i in complexityComp.DEFAULT_CORDS:
        values.append(check_exec_time(i))
    
    values.append("sieve")
    complexityComp.load_data(complexityComp.DEFAULT_CORDS, values)
