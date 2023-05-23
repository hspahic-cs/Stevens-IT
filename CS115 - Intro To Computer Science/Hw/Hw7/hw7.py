# *********************************************
# Name     : Harris Spahic
# Pledge   : I pledge my honor I have abided by the Stevens honor system.
# Favorite flavor of dorito : Cool Ranch
# *********************************************

class Term:
    # A class storing two numbers to represent a monomial k*x^n

    def __init__(self, coef=1, exp=0): #myTerm = Term(...)
        ''' Term(coef, exp) creates a new term. If no coef or exp are provided, they default to 0. '''
        self.coef = coef # k
        self.exp = exp   # n

    def __str__(self): # print(myTerm)
        ''' Returns a string representation of the term '''
        return str(self.coef) + "x^" + str(self.exp)

    # TODO
    def __eq__(self, other): # myTerm == other
        ''' Returns a boolean if two terms are equal to each other '''
        return (self.coef == other.coef and self.exp == other.coef)

    # TODO
    def __call__(self, input): # myTerm(input)
        ''' Given x=input, return the evaluation of the term at that x'''
        return (input ** self.exp) * self.coef

    # TODO
    def __neg__(self): # otherTerm = -myTerm
        '''returns a new term, with the coef negated with respect to self'''
        return Term(-1 * self.coef, self.exp)

# LinkedPolynomial
# Adapted in java by Antonio Nicolosi from
# https://introcs.cs.princeton.edu/java/92symbolic/LinkedPolynomial.java, (c) 2000-2018
# Adapted to Python by Justin Barish, 2018
# Refactored by Toby Dalton, 2019 and Dom DiMaggio, 2020


class LinkedPolynomial:
# This class represents a polynomial, by a list of Terms
# It is assumed that every input polynomial will be in
# Correct form - that is, no 0 coefficients and the
# exponent is strictly decreasing

    def  __init__(self, polyList=[]): # myPoly = LinkedPolynomial(...)
        ''' Creates a new LP object '''
        self.polyList = polyList.copy()

    def addTerm(self, t): # myPoly.addterm(Term(coef, exp))
        ''' Adds a given term to the LP - assume it is valid '''
        self.polyList.append(t)

    def createListFromNumbers(self,numList): # myPoly2; myPoly2.createListFromNumber(...)
        ''' Creates a polynomial given a list of tuples
        Assumes the list to be in the form [(coef1, exp1), (coef2, exp2)...]
        with no duplicate exponents, and exponents in descending order
        and no 0 exponents. '''
        for i in range(len(numList)):
            t = Term(numList[i][0], numList[i][1])
            self.polyList.append(t)

    def __len__(self): # len(myPoly)
        ''' Returns the length of the polynomial (number of nonzero monomials)'''
        return len(self.polyList)

    def __str__(self): # print(myPoly)
        ''' Returns a string representation of the polynomial '''
        if len(self) == 0: return ""
        ans = str(self.polyList[0].coef) + "x^" + str(self.polyList[0].exp)
        for i in range(1, len(self)):
            coef = self.polyList[i].coef
            exp = self.polyList[i].exp
            if coef > 0:
                ans += " + " + str(coef) + "x^" + str(exp)
            elif coef < 0:
                ans += " - " + str(-coef) + "x^" + str(exp)
        return ans

    def __add__(self, otherPoly): # addPoly = myPoly + otherPoly
        ''' Returns a polynomial representing the sum of self and otherPoly
        Note: If both inputs are properly ordered, so will the outcome be! '''
        result = LinkedPolynomial() # Our sum polynomial
        i = 0 # Tracks where in self we are
        j = 0 # Tracks where in otherPoly we are

        # Essentially do a merge(sort) style combination of the two
        while i < len(self) or j <len(otherPoly) : # Continue until both the two are exhausted

            if i < len(self): # If not at end of self? make x that
                x = self.polyList[i]
            else: # Else self is exhausted,  add from other
                y = otherPoly.polyList[j]
                result.addTerm(Term(y.coef, y.exp))
                j += 1
                continue

            if j < len(otherPoly): # Now, if not at end of other? make y that
                y = otherPoly.polyList[j]
            else: # Else other is exhausted, add from self
                result.addTerm(Term(x.coef, x.exp))
                i += 1
                continue

            if x.exp == y.exp: # If the two exp are the same, combine them into sum
                coef = x.coef + y.coef
                if (coef != 0): # Only add if not 0 !
                    result.addTerm(Term(coef, x.exp))
                i += 1
                j += 1
            elif x.exp < y.exp: # Add the larger exp otherwise.
                result.addTerm(Term(y.coef, y.exp))
                j += 1
            else:
                result.addTerm(Term(x.coef, x.exp))
                i += 1

        return result

    # TODO
    def __eq__(self, other): # myPoly == other
        '''Checks if 2 polynomials are equal. Note no polynomials will have 0-coefficient terms.
        Hint: If two LP are equal, then they will be identical in every way '''
        if len(self.polyList) == len(other.polyList): # makes sure length of both polonomials equal
            for i in range(len(self.polyList)): # Compares every coefficient & exponent of self & other
                if not (self.polyList[i] == other.polyList[i]):
                    return False
            return True
        else: return False

    # TODO
    def __call__(self, input): # myPoly(input)
        ''' Evaluates self at x=input - should use Term's __call__ '''
        sum = 0
        for term in self.polyList:
            sum += term(input)
        return sum

    # TODO
    def __neg__(self): # negPoly = -myPoly
        ''' Return an LP representing -1 * self - should use Term's __neg__
        do NOT modify self  while doing this '''
        neg_poly = LinkedPolynomial([])
        for term in self.polyList:
            neg_poly.addTerm(-term)
        return neg_poly


    # TODO
    def __sub__(self, other): # subPoly = myPoly - other
        ''' Returns a new LP representing self - other - should use __add__ !
        do NOT modify self or other while doing this '''
        subPoly = (self + -other)
        return subPoly

    # TODO
    def __mul__(self, otherPoly): # mulPoly = myPoly * otherPoly
        '''multiply 2 polynomials together
        must return a new polynomial without changing
        self & otherPoly, and be ordered correctly
        Hint: do it on paper first! '''
        productPoly = LinkedPolynomial([])
        for initTerm in self.polyList:
            newPolyList = LinkedPolynomial([])
            for secondTerm in otherPoly.polyList:
                tempTerm = Term(initTerm.coef * secondTerm.coef, initTerm.exp + secondTerm.exp)
                newPolyList.addTerm(tempTerm)
                print(newPolyList)

            productPoly += newPolyList

        return(productPoly)
