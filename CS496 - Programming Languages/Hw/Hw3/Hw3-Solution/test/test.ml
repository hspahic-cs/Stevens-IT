open Proc.Ds
open Test_lib

(*
 * Use this file to create and run your own tests with "dune runtest" in
 * assignment root directory. We created a wrapper around oUnit2 in
 * test_lib.ml, if you would like to read the source.
 *
 * A unit_test constructor takes:
   * test case name
   * test case code
   * expected result
   * point value (irrelevant for student-defined tests)
 *
 * NOTE: We do not expect specific strings for your error messages, so if you
 * want to test that some code fails, use generic_err.
 *)

(* arithmetic tests provided for you as an example *)
let arith : unit_test list = [
  Interp ("positive-const", "11", Ok (NumVal 11), 0);
  Interp ("negative-const", "(-11)", Ok (NumVal (-11)), 0);
  Interp ("simple-arith-1", "44-33", Ok (NumVal 11), 0);
  Interp ("divide-by-zero", "3/0", generic_err, 0);
]

let proc : unit_test list = [
  Interp ("proc-1", "(proc (x) { x + 1 } 2)", Ok (NumVal 3), 0);
]

let extensions_tests = [
  Interp ("abs-0", "abs(0)", Ok (NumVal 0), 0);
  Interp ("abs-pos", "abs(22)", Ok (NumVal 22), 0);
  Interp ("abs-neg", "abs((-22))", Ok (NumVal 22), 0);

  Interp ("emptylist", "emptylist", Ok (ListVal []), 0);

  Interp ("cons-singleton", "cons(1, emptylist)", Ok (ListVal [NumVal 1]), 0);
  Interp ("cons-list",
    "cons(3, cons(2, cons(1, emptylist)))",
    Ok (ListVal [NumVal 3; NumVal 2; NumVal 1]),
    0);

  Interp ("hd-singleton", "hd(cons(1, emptylist))", Ok (NumVal 1), 0);
  Interp ("hd-list",
    "hd(cons(3, cons(2, cons(1, emptylist))))",
    Ok (NumVal 3),
    0);

  Interp ("tl-singleton", "tl(cons(1, emptylist))", Ok (ListVal []), 0);
  Interp ("tl-list",
    "tl(cons(3, cons(2, cons(1, emptylist))))",
    Ok (ListVal [NumVal 2; NumVal 1]),
    0);

  Interp ("null-true", "empty?(tl(cons(1, emptylist)))", Ok (BoolVal true), 0);
  Interp ("null-false", "empty?(cons(1, emptylist))", Ok (BoolVal false), 0);
]

(* add lists of tests to the suite here *)
let _ = run_suite "student test suite" [
  arith;
  proc;
  extensions_tests;
]
