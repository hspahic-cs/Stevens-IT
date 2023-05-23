#!/bin/bash
touch results.txt

echo "Minimum Byte Size\n" >> results.txt
java SymmetricKeyTest.java DES 56 CBC 100000 "This is a test message" >> results.txt
java SymmetricKeyTest.java TripleDES 112 CBC 100000 "This is a test message" >> results.txt
java SymmetricKeyTest.java RC2 40 CBC 100000 "This is a test message" >> results.txt
java SymmetricKeyTest.java AES 128 CBC 100000 "This is a test message" >> results.txt
java SymmetricKeyTest.java Blowfish 32 CBC 100000 "This is a test message" >> results.txt

echo "Different Modes\n" >> results.txt
java SymmetricKeyTest.java AES 128 ECB 100000 "This is a test message" >> results.txt
java SymmetricKeyTest.java AES 128 CBC 100000 "This is a test message" >> results.txt
java SymmetricKeyTest.java AES 128 OFB 100000 "This is a test message" >> results.txt
java SymmetricKeyTest.java AES 128 PCBC 100000 "This is a test message" >> results.txt

echo "ECB different Key Sizes\n" >> results.txt
java SymmetricKeyTest.java RC2 64 CBC 100000 "This is a test message" >> results.txt
java SymmetricKeyTest.java RC2 256 CBC 100000 "This is a test message" >> results.txt
java SymmetricKeyTest.java RC2 1000 CBC 100000 "This is a test message" >> results.txt

echo "AES different Msg Lengths\n" >> results.txt
java SymmetricKeyTest.java AES 128 ECB 100000 "This is a test message" >> results.txt
java SymmetricKeyTest.java AES 128 ECB 100000 "To be or not to be that is the question. Tis nobler of the mind to bear the strings and arrows of outrageous fortune. Or take arms against a sea of troubles, and in opposing; end them." >> results.txt
java SymmetricKeyTest.java AES 128 ECB 100000 "Wow" >> results.txt
