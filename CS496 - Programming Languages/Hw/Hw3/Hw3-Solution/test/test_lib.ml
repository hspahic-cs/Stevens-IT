open OUnit2
open Proc.Ds
open Proc.Interp


(* Generic error result for tests that should produce an error *)
let generic_err : 'a result = Error ("<message>")


(* A unit test constructor has (name, code, result, points).
 *
 * For student-defined tests, the point value field is irrelevant.
 *
 * Results which are errors should be a single generic error instead of a
 * specific error message. Thus, use generic_err for such tests.
*)
type unit_test =
  | Interp of string * string * exp_val result * int


(* string functions needed for pretty printing *)
let string_of_expval_result : exp_val result -> string = function
  | Ok v -> "Ok (" ^ (string_of_expval v) ^ ")"
  | Error s -> "Error (" ^ s ^ ")"

(* Transforms our unit_test into an OUnit test with pretty printing *)
let test_of_unit_test (test : unit_test) : OUnit2.test =
  let enhanced_assert name points result target =
    let failed =
      name ^ " failed, -" ^ (string_of_int points) ^ " point(s)"
    in
    assert_equal
      ~msg:(failed)
      ~printer:string_of_expval_result
      result
      target
  in

  (* exceptions are turned into "error" results to preserve pretty
   * printing, but an exception is always considered incorrect behavior *)
  let err_test name code points func =
    name >:: (fun _ ->
      let target = try func code with e ->
        match generic_err with
        | Ok _ -> failwith "unexpected"
        | Error msg ->
            let str_exn = Printexc.to_string e in
            Error ("exception: " ^ str_exn ^ " (no " ^ msg ^ ")")
      in
      match target with
      | Error _ -> ()
      | Ok _ as value -> enhanced_assert name points generic_err value)
  in

  let normal_test name code result points func =
    name >:: (fun _ ->
      let target = try func code with e ->
        Error (Printexc.to_string e)
      in
      enhanced_assert name points result target)
  in

  match test with
  | Interp (name, code, Error _, points) ->
      err_test name code points interp
  | Interp (name, code, result, points) ->
      normal_test name code result points interp

let run_suite (name : string) (tests : unit_test list list) =
  let suite = List.(map test_of_unit_test (concat tests)) in
  run_test_tt_main (name >::: suite)
