(* The type of the abstract syntax tree (AST). *)
type expr =
  | Var of string
  | Int of int
  | Add of expr*expr
  | Sub of expr*expr
  | Mul of expr*expr
  | Div of expr*expr
  | Let of string*expr*expr
  | IsZero of expr
  | ITE of expr*expr*expr
  | Proc of string*expr
  | App of expr*expr
  | Abs of expr
  | Cons of expr*expr
  | Hd of expr
  | Tl of expr
  | Empty of expr
  | EmptyList
  | EmptyTree
  | Node of expr*expr*expr
  | CaseT of expr*expr*string*string*string*expr
  | Unpair of string*string*expr*expr
  | Tuple of expr list
  | Untuple of string list * expr*expr
  | Record of (string*expr) list
  | Proj of expr*string
    
let rec string_of_expr e =
  match e with
  | Var s -> "Var "^s
  | Int n -> "Int "^string_of_int n
  | Add(e1,e2) -> "Add(" ^ (string_of_expr e1) ^ "," ^ string_of_expr e2 ^ ")"
  | Sub(e1,e2) -> "Sub(" ^ (string_of_expr e1) ^ "," ^ string_of_expr e2 ^ ")"
  | Mul(e1,e2) -> "Mul(" ^ (string_of_expr e1) ^ "," ^ string_of_expr e2 ^ ")"
  | Div(e1,e2) -> "Div(" ^ (string_of_expr e1) ^ "," ^ string_of_expr e2 ^ ")"
  | Let(x,def,body) -> "Let("^x^","^string_of_expr def ^","^ string_of_expr body ^")"
  | IsZero(e1) -> "Zero?("^string_of_expr e1 ^")"
  | ITE(e1,e2,e3) -> "IfThenElse("^string_of_expr e1^"," ^ string_of_expr e2^"," ^ string_of_expr e3  ^")"
  | Abs(e1) -> "Abs("^string_of_expr e1^")"
  | App(e1,e2) -> "("^string_of_expr e1^" " ^ string_of_expr
                    e2^")"
  | Proc(id,e) -> "proc ("^id^") {"^string_of_expr e^"}"
  | Cons(e1,e2) -> "Cons(" ^ (string_of_expr e1) ^ "," ^ string_of_expr e2 ^ ")"
  | Hd(e1) -> "Hd("^string_of_expr e1 ^")"
  | Tl(e1) -> "Tl("^string_of_expr e1 ^")"
  | Empty(e1) -> "Empty("^string_of_expr e1 ^")"
  | EmptyList -> "EmptyList"
  | EmptyTree -> "EmptyTree"
  | Node(e1,e2,e3) -> "Node("^string_of_expr e1^"," ^ string_of_expr
                        e2^"," ^ string_of_expr e3  ^")"
  |  CaseT(e1,e_empty,did,lid,rid,e_node) -> "CaseT "^string_of_expr e1^" of
  \n { emptytree -> "^string_of_expr e_empty^",\n"^
                                             "node("^did^","^lid^","^rid
                                             ^") -> "^string_of_expr
                                               e_node^"} "
  | Unpair(id1,id2,e1,e2) -> "unpair("^id1^","^id2^")="^string_of_expr
                               e1^" in "^string_of_expr e2
  | Tuple(es) -> "<" ^ String.concat "," (List.map string_of_expr es) ^">"
  | Untuple(ids,e1,e2) -> "untuple <"^ String.concat "," ids ^ ">="^
                          string_of_expr e1 ^" in "^string_of_expr e2
  | Record(fs) -> "{"^String.concat "," (List.map (fun (id,e) ->
  id^"="^string_of_expr e) fs) ^"}"
  | Proj(e,id) -> string_of_expr e ^"."^id

