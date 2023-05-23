(**Hiya Bhavsar & Harris Spahic
I pledge my honor that I have abided  by the Stevens Honor System. *)

open Ast
open Ds


let rec apply_proc : exp_val -> exp_val -> exp_val ea_result =
  fun f a ->
  match f with
  | ProcVal (id,body,env) ->
    return env >>+
    extend_env id a >>+
    eval_expr body
  | _ -> error "apply_proc: Not a procVal"
and
 eval_expr : expr -> exp_val ea_result = fun e ->
  match e with
  | Int(n) ->
    return @@ NumVal n
  | Var(id) ->
    apply_env id
  | Add(e1,e2) ->
    eval_expr e1 >>=
    int_of_numVal >>= fun n1 ->
    eval_expr e2 >>=
    int_of_numVal >>= fun n2 ->
    return @@ NumVal (n1+n2)
  | Sub(e1,e2) ->
    eval_expr e1 >>=
    int_of_numVal >>= fun n1 ->
    eval_expr e2 >>=
    int_of_numVal >>= fun n2 ->
    return @@ NumVal (n1-n2)
  | Mul(e1,e2) ->
    eval_expr e1 >>=
    int_of_numVal >>= fun n1 ->
    eval_expr e2 >>=
    int_of_numVal >>= fun n2 ->
    return @@ NumVal (n1*n2)
  | Div(e1,e2) ->
    eval_expr e1 >>=
    int_of_numVal >>= fun n1 ->
    eval_expr e2 >>=
    int_of_numVal >>= fun n2 ->
    if n2==0
    then error "Division by zero"
    else return @@ NumVal (n1/n2)
  | Let(id,def,body) ->
    eval_expr def >>=
    extend_env id >>+
    eval_expr body
  | ITE(e1,e2,e3) ->
    eval_expr e1 >>=
    bool_of_boolVal >>= fun b ->
    if b
    then eval_expr e2
    else eval_expr e3
  | IsZero(e) ->
    eval_expr e >>=
    int_of_numVal >>= fun n ->
    return @@ BoolVal (n = 0)
  | Proc(id,e)  ->
    lookup_env >>= fun en ->
    return (ProcVal(id,e,en))
  | App(e1,e2)  ->
    eval_expr e1 >>= fun v1 ->
    eval_expr e2 >>= fun v2 ->
    apply_proc v1 v2
  | Abs(e1)      ->
    eval_expr e1  >>=
    int_of_numVal >>= fun n ->
    return @@ NumVal (abs n)
  | Cons (e1, e2) -> (*Didn't need to implement*)
    eval_expr e1 >>= fun v1 ->
    eval_expr e2 >>=
    list_of_listVal >>= fun v2 ->
    return @@ ListVal(v1::v2)
  | Hd(e1) ->  (*Didn't need to implement*)
    eval_expr e1 >>= 
    list_of_listVal >>= fun v1 ->
    return @@ List.hd v1
  | Tl(e1) ->  (*Didn't need to implement*)
    eval_expr e1 >>= 
    list_of_listVal >>= fun v1 ->
    return @@ ListVal(List.tl v1)
  | Record(fs) ->
    (match List.split fs with 
    | (strL,expL) -> 
      if find_dupl strL
      then error "Record: duplicate fields"
      else sequence(List.map eval_expr expL) >>= fun v1 ->
      return @@ RecordVal(List.combine strL v1) )
  | Proj(e,id) ->  
    eval_expr e >>= 
    record_of_recordVal >>= fun v1 ->
    (match List.split v1 with
    | (strL, expL) ->
      if List.mem id strL
      then return @@ (List.nth expL (find_index strL id 0))
      else error "Proj: field does not exist")
  | Empty(e1)  -> 
    eval_expr e1 >>= 
    tree_of_treeVal >>= fun v1 ->
    if (v1 = Empty) 
    then return @@ BoolVal(true) 
    else return @@ BoolVal(false)
  | EmptyList ->  return @@ ListVal([]) (*Didn't need to implement*)
  | EmptyTree ->  return @@ TreeVal(Empty)
  | Node(e1,lte,rte) ->  
    eval_expr e1 >>= fun v1 ->
    eval_expr lte >>= 
    tree_of_treeVal>>= fun left ->
    eval_expr rte >>= 
    tree_of_treeVal >>= fun right ->
    return @@ TreeVal(Node(v1,left, right))
  | CaseT(target,emptycase,id1,id2,id3,nodecase) ->
    eval_expr target >>= 
    tree_of_treeVal >>= fun v1 ->
    (match v1 with
    |Empty -> eval_expr emptycase
    |Node(x, lte, rte) ->  
      extend_env id1 x >>+
      extend_env id2 (TreeVal lte) >>+
      extend_env id3 (TreeVal rte) >>+
      eval_expr nodecase)
  (* | Tuple(es) ->  failwith "implement me"
  | Untuple(ids,e1,e2) ->  failwith "implement me" *)
  | _ -> failwith "not implemented"


(***********************************************************************)
(* Everything above this is essentially the same as we saw in lecture. *)
(***********************************************************************)

(* Parse a string into an ast *)


let parse s =
  let lexbuf = Lexing.from_string s in
  let ast = Parser.prog Lexer.read lexbuf in
  ast

let lexer s =
  let lexbuf = Lexing.from_string s
  in Lexer.read lexbuf


(* Interpret an expression *)
let interp (e:string) : exp_val result =
  let c = e |> parse |> eval_expr
  in run c

