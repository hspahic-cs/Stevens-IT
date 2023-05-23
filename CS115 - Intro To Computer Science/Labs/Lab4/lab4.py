'''
Name: Harris Spahic
Pledge: I pledge my honor I have abided by the Stevens Honor System

ONLY AVAILABLE TOOLS:
- conditionals
- recusion
- list indexing
- list slicing
'''

def dotProduct(L, K):
    if len(L) == len(K):
        if not L:
            return 0
        else:
            return L[0] * K[0] + dotProduct(L[1:], K[1:])
    else:
        print("Dot product not defined")


def expand(S):
    if not S:
        return []
    else:
        return [S[0]] + expand(S[1:])


def deepMember(e, L):
    if not L:
        return False
    elif isinstance(L[0], list):
        return deepMember(e, L[0]) or deepMember(e, L[1:])
    else:
        return e == L[0] or deepMember(e, L[1:])


def removeAll(e, L):
    if not L:
        return L
    elif L[0] == e:
        return removeAll(e, L[1:])
    else:
        return [L[0]] + removeAll(e, L[1:])


def myFilter(prop, L):
    if not L:
        return L
    elif prop(L[0]):
        return [L[0]] + myFilter(prop, L[1:])
    else:
        return myFilter(prop, L[1:])


def deepReverse(L):
    if not L:
        return L
    elif isinstance(L[len(L) - 1], list):
        return [deepReverse(L[len(L)-1])] + deepReverse(L[:len(L) - 1])
    else:
        return [L[len(L)- 1]] + deepReverse(L[:len(L) - 1])
