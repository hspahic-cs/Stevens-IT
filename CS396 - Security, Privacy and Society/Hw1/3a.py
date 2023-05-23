from string import ascii_letters
import numpy as np
import matplotlib.pyplot as plt

with open("3a-ciphertext.txt", "r") as f:
    ciphertexts = f.readlines()
    f.close()


for cipher in ciphertexts:
    for x in range(33):
        i = bin(int(cipher[x:x+2], 16))
        print(f"{i} ", end="")
        #ascii_convert[i] = ascii_convert[i] + 1
    print()



#print(ascii_convert)

# XOR 2 ciphers --> Key 

# 1101 1101 <- OTP
# 1010 0101 <- msg
# ------------
# 0111 1000 <- Encrypt

# 1101 1101 <- OTP
# 1111 1111 <- msg2
# ------------
# 0010 0010 <- Encrypt2

# 0111 1000
# 0010 0010 
# ---------
# 0101 1010

# 1010 0101
# 1111 1111 
# ---------
# 0101 1010


# (a x b = c) (a x b2 = c2)
# (a x b) x (a x b2) --> (b x b2)
