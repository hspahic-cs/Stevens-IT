####################################################################################
# Name: Harris Spahic
# Pledge: I pledge my honor that I have abided by the Stevens Honor System.
####################################################################################
# Lab 6: Recursion 2
# Demonstrate recursion as an algorithm design technique for the problem of
# computing the (length of the) longest common subsequence of two given strings
#####################################################################################

##############################################################################
# Example: The longest common subsequence of "helllowo_rld" and "!helloabcworld!"
# is "helloworld", and it has a length of 10.
#
# Therefore LLCS("helllowo_rld", "!helloabcworld!") returns 10, and
# LCS("helllowo_rld", "!helloabcworld!") returns "helloworld"
##############################################################################

def LLCS(S1, S2):
    '''
    Return the length of the longest common subsequence (LLCS) of strings S1 and S2
    '''
    if not S1 or not S2:
        return 0

    if S1[0] == S2[0]:
        return LLCS(S1[1:], S2[1:]) + 1
    else:
        return max(LLCS(S1, S2[1:]), LLCS(S1[1:], S2))


##############################################################################
# Instead of returning the length of the longest common substring, this task
# asks you to return the string itself.
##############################################################################
# Tip: You may find it helpful to copy your solution to LLCS and edit it
# to solve this problem
##############################################################################

def LCS(S1, S2):
        if not S1 or not S2:
            return ""

        if S1[0] == S2[0]:
            return S1[0] + LCS(S1[1:], S2[1:])
        else:
            first = LCS(S1, S2[1:])
            second = LCS(S1[1:], S2)

            if len(first) > len(second):
                return first
            else:
                return second
