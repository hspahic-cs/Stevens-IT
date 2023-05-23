CC=gcc
CFLAGS=-I.
DEPS = hellomake.h

%.o: %.c $(DEPS)
	$(CC) -c -o $@ $< $(CFLAGS)

sort: sort.o mergesort.o
	$(CC) -o $@ sort.o mergesort.o

clean:
	@rm -f *.o