#! /bin/bash

# Create base directory
mkdir base
touch base/empty.txt
man grep > base/grep.txt
mkdir base/L1
mkdir base/R1

# Create L1 directory
ls -al > base/L1/ls.txt
chmod -777 base/L1/ls.txt
pwd > base/L1/pwd.txt
man gdb > base/L1/gdb.txt
chmod -777 base/L1/gdb.txt
man man > base/L1/man.txt

#Create R1 directory
man less > base/R1/less.txt
chmod -777 base/R1/less.txt
man more > base/R1/more.txt
ps > base/R1/current_processes.txt
chmod -777 base/R1/current_processes.txt
man chown > base/R1/chown.txt