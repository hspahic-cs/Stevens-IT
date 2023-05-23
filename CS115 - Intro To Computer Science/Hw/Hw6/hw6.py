#
# 20fa-cs115bc
#
# Antonio R. Nicolosi
# 20201120
#************************************************************
# *  Name  : Harris Spahic
# * Pledge : I pledge my honor I have abided by the Stevens honor system.
#************************************************************

# Programming problems with one-dimensional arrays.
def isWithinRange(arr, min, sup):
    """
     Return True if and only if all entries in the array fall between
     the specified values, with min being permitted but sup being just
     beyond the allowable range).

     Sample input/outputs:
     Let arr = [3, -5,  7, -1, -8, 0, -6, -2]
     Then:
	 * isWithinRange(arr, -6, 10) -> False;
	 * isWithinRange(arr, -8, 10) -> True;
	 * isWithinRange(arr, -8, 7)  -> False;
	 */
    """
    if arr:
        max_element = arr[0]
        min_element = arr[0]
    else:
        return False

    for x in arr:
        if x > max_element:
            max_element = x
        if x < min_element:
            min_element = x

    if max_element >= sup or min_element < min:
        return False
    else:
        return True


def isPermutation(arr):
    """Returns True if and only if its entries, taken as a set, consist
    of all the numbers between 0 and len(arr)-1 (possibly permuted
    according to some arbitrary order).

    Sample input/outputs:
    * isPermutation([3, -5, 7, 4, -1, -8, 0, -6, -2]) --> False
    * isPermutation([3, 5, 7, 4, 1, 8, 0, 6, 2])      --> True
    * isPermutation([3, 1, 0, 3, 0])                  --> False
    * isPermutation([])                               --> True
    """

    copy = sorted(arr[:])
    print(copy)
    for x in range(len(arr)):
        if (x) != copy[x]:
            return False

    return True

def isCyclic(arr):
    """
    Return true if-and-only-if the sequence arr[0], * arr[arr[0]],
    arr[arr[arr[0]]], ... reaches 0 * after traversing all entries in
    arr.

    Sample input/outputs:
    * isCyclic([3, 5, 7, 4, 1, 8, 0, 6, 2)] --> True
    * isCyclic([3, 5, 7, 4, 1, 8, 6, 0, 2]) --> False
    * isCyclic([3, 1, 0, 3, 0])             --> False
    * isCyclic([])                          --> True
    """
    if arr == []:
        return True

    def helper(arr, start):
        if arr[start] == 0:
            return [0]

        if arr[start] == start:
            return []

        return [arr[start]] + helper(arr, arr[start])

    if sorted(helper(arr, 0)) == sorted(arr):
        return True
    else:
        return False


def isSloppilySorted(arr, k):
    """
    Return True if-and-only-if the entries in arr are sorted sloppily
    "up to k", that is, every entry precedes at most k smaller values
     and follows at most k larger values.

    Sample input/outputs:
    * isSloppilySorted([3, 2, 1, 0, 4, 8, 7, 6, 5], 3) --> True
    * isSloppilySorted([3, 2, 1, 0, 4, 8, 7, 6, 5], 2) --> False
    * isSloppilySorted([0, 1, 2, 3, 4, 5, 6, 7, 8], 1) --> True
    * isSloppilySorted([], 3)                          --> True
    """
    precede = 0
    follows = 0

    for x in range(len(arr)):
        for y in range(len(arr)):
            if x > y:
                if arr[y] > arr[x]:
                    follows += 1
            if y > x:
                if arr[x] > arr[y]:
                    precede += 1

            if precede > k or follows > k:
                return False

            if y == (len(arr) - 1):
                precede = 0
                follows = 0

    return True
