open ReM
(* This file defines expressed values and environments *)


(* expressed values and environments are defined mutually recursively *)

type 'a tree = Empty | Node of 'a * 'a tree * 'a tree

type exp_val =
  | NumVal of int
  | BoolVal of bool
  | UnitVal
  | PairVal of exp_val*exp_val
  | ProcVal of string*Ast.expr*env
  | RefVal of int
  | ListVal of exp_val list
  | TreeVal of exp_val tree
  | RecVal of (string*exp_val) list
and
  env =
  | EmptyEnv
  | ExtendEnv of string*exp_val*env
  | ExtendEnvRec of string*string*Ast.expr*env

(* Expressed Result *)
                 
type 'a ea_result = (env,'a) a_result


let run (c:'a ea_result) : 'a result =
  c EmptyEnv


(* Operations on environments *)
let empty_env : unit -> env ea_result =
  fun () ->
  return EmptyEnv

let extend_env : string -> exp_val -> env ea_result =
  fun id v env ->
    Ok (ExtendEnv(id,v,env))


let extend_env_rec : string -> string -> Ast.expr -> env ea_result =
  fun id par body env  ->
    Ok (ExtendEnvRec(id,par,body,env))

let rec apply_env : string -> exp_val ea_result =
  fun id env ->
  match env with
  | EmptyEnv -> Error (id^" not found!")
  | ExtendEnv(v,ev,tail) ->
    if id=v
    then Ok ev
    else apply_env id tail
  | ExtendEnvRec(v,par,body,tail) ->
    if id=v
    then Ok (ProcVal (par,body,env))
    else apply_env id tail
                              

(* operations on expressed values *)


let int_of_numVal : exp_val -> int ea_result =  function
  |  NumVal n -> return n
  | _ -> error "Expected a number!"

let bool_of_boolVal : exp_val -> bool ea_result =  function
  |  BoolVal b -> return b
  | _ -> error "Expected a boolean!"

let pair_of_pairVal : exp_val -> (exp_val*exp_val) ea_result = function
  | PairVal(v1,v2) -> return (v1,v2)
  | _ -> error "Expected a pair!"
           
let rec string_of_list_of_strings = function
  | [] -> ""
  | [id] -> id
  | id::ids -> id ^ "," ^ string_of_list_of_strings ids

let int_of_refVal =  function
  |  RefVal n -> return n
  | _ -> error "Expected a reference!"


let list_of_listVal =  function
  | ListVal l -> return l
  | _ ->  error "Expected a list!"

let tree_of_treeVal =  function
  | TreeVal t -> return t
  | _ -> error "Expected a tree!"

let rec string_of_expval = function
  | NumVal n -> "NumVal " ^ string_of_int n
  | BoolVal b -> "BoolVal " ^ string_of_bool b
  | UnitVal -> "UnitVal "
  | ProcVal (id,body,env) -> "ProcVal ("^ id ^","^Ast.string_of_expr
                               body^","^ string_of_env' env^")"
  | PairVal(v1,v2) -> "PairVal("^string_of_expval
                        v1^","^string_of_expval v2^")"
  | RefVal i -> "RefVal ("^string_of_int i^")"
  | RecVal(fs) -> "RecVal ("^ (String.concat "," (List.map (fun (id,ev) ->
      id^":="^string_of_expval ev) fs)) ^")"
  | ListVal(evs) -> "ListVal("^String.concat "," (List.map string_of_expval evs)^")"
  | TreeVal(_t) -> "TreeVal(...)"
and
  string_of_env'  = function
  | EmptyEnv -> ""
  | ExtendEnv(id,v,env) -> string_of_env' env^"\n("^id^","^string_of_expval v^")"
  | ExtendEnvRec(id,param,body,env) -> string_of_env' env^"\n("^id^","^param^","^Ast.string_of_expr body^")"

let string_of_env : string ea_result =
  fun env ->
  Ok ("Environment:\n"^ string_of_env' env)
