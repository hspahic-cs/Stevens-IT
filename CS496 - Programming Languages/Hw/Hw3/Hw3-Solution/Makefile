SUBMIT1 := src/interp.ml
SUBMIT2 := src/ds.ml
TIMESTAMP := $(shell /bin/date "+%Y-%m-%d-%H:%M:%S")
ZIPNAME := hw3_$(TIMESTAMP).zip

all:
	dune build

.PHONY: test
test:
	dune runtest

zip: $(SUBMIT)
	zip '$(ZIPNAME)' $(SUBMIT1) $(SUBMIT2)

.PHONY: clean
clean:
	dune clean

.PHONY: utop
utop:
	dune utop
