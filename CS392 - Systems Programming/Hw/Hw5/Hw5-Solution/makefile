CC=gcc
CFLAGS=-I. -g
DEPS = mini_shell.h

%.o: %.c $(DEPS)
	$(CC) -c -o $@ $< $(CFLAGS)

shell: mini_shell.o
	$(CC) -o shell mini_shell.o

clean:
	rm -f *.o