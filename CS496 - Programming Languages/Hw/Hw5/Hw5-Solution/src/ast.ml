(* The type of the abstract syntax tree (AST). *)

type expr =
  | Var of string
  | Int of int
  | Unit
  | Add of expr*expr
  | Sub of expr*expr
  | Mul of expr*expr
  | Div of expr*expr
  | Let of string*expr*expr
  | IsZero of expr
  | ITE of expr*expr*expr
  | Proc of string*texpr*expr
  | App of expr*expr
  | Letrec of string*string*texpr*texpr*expr*expr
  | Set of string*expr
  | BeginEnd of expr list
  | NewRef of expr
  | DeRef of expr
  | SetRef of expr*expr
  (* pair *)
  | Pair of expr*expr
  | Unpair of string*string*expr*expr
  (* list *)
  | EmptyList of texpr
  | Cons of expr*expr
  | IsNullL of expr
  | Hd of expr
  | Tl of expr
  | Debug of expr
  (* tree *)
  | EmptyTree of texpr
  | Node of expr*expr*expr
  | IsNullT of expr
  | GetData of expr
  | GetLST of expr
  | GetRST of expr
and
  texpr =
  | IntType
  | BoolType
  | UnitType
  | FuncType of texpr*texpr
  | RefType of texpr
  | PairType of texpr*texpr
  | ListType of texpr
  | TreeType of texpr


let rec string_of_expr e =
  match e with
  | Var s -> "Var "^s
  | Int n -> "Int "^string_of_int n
  | Unit -> "Unit"
  | Add(e1,e2) -> "Add(" ^ (string_of_expr e1) ^ "," ^ string_of_expr e2 ^ ")"
  | Sub(e1,e2) -> "Sub(" ^ (string_of_expr e1) ^ "," ^ string_of_expr e2 ^ ")"
  | Mul(e1,e2) -> "Mul(" ^ (string_of_expr e1) ^ "," ^ string_of_expr e2 ^ ")"
  | Div(e1,e2) -> "Div(" ^ (string_of_expr e1) ^ "," ^ string_of_expr e2 ^ ")"
  | NewRef(e) -> "NewRef(" ^ (string_of_expr e) ^ ")"
  | DeRef(e) -> "DeRef(" ^ (string_of_expr e) ^ ")"
  | SetRef(e1,e2) -> "SetRef(" ^ (string_of_expr e1) ^ "," ^ string_of_expr e2 ^ ")"
  | Let(x,def,body) -> "Let("^x^","^string_of_expr def ^","^ string_of_expr body ^")"
  | Proc(x,t,body) -> "Proc("^x^":"^string_of_texpr t^"," ^ string_of_expr body ^")"
  | App(e1,e2) -> "App("^string_of_expr e1 ^"," ^ string_of_expr e2^")"
  | IsZero(e) -> "Zero?("^string_of_expr e ^")"
  | ITE(e1,e2,e3) -> "IfThenElse("^string_of_expr e1^"," ^ string_of_expr e2^"," ^ string_of_expr e3  ^")"
  | Letrec(x,param,tPara,tRes, def,body) -> "Letrec("^string_of_texpr
  tRes^" "^x^","^param^":"^string_of_texpr tPara ^","^ string_of_expr def ^","^ string_of_expr body ^")"

  (* pair *)
  | Pair(e1, e2) -> "Pair("^(string_of_expr e1)^"*"^string_of_expr e2 ^ ")"
  | Unpair(id1, id2, e_pair, e_body) -> "Unpair((" ^ id1 ^ "," ^ id2 ^ ")= " ^(string_of_expr e_pair) ^ " in " ^ string_of_expr e_body ^")"

  (* list *)
  | EmptyList(te) -> "EmptyList(" ^ string_of_texpr te ^ ")"
  | Cons(he, te) -> "Cons(" ^ (string_of_expr he) ^ "*" ^ string_of_expr te^ ")"
  | IsNullL(e) -> "Null(" ^ string_of_expr e ^ ")"
  | Hd(e) -> "Hd(" ^ string_of_expr e ^ ")"
  | Tl(e) -> "Tl(" ^ string_of_expr e ^ ")"

  (* tree *)
  | EmptyTree(te) -> "EmptyTree(" ^ string_of_texpr te ^ ")"
  | Node(data, lst, rst) -> "Node(" ^ (string_of_expr data) ^ "," ^ (string_of_expr lst) ^ "," ^ (string_of_expr rst) ^ ")"
  | IsNullT(e) -> "NullT(" ^ (string_of_expr e) ^ ")"
  | GetData(e) -> "GetData(" ^ (string_of_expr e) ^ ")"
  | GetLST(e) -> "GetLST(" ^ (string_of_expr e) ^ ")"
  | GetRST(e) -> "GetRST(" ^ (string_of_expr e) ^ ")"

  | Set(x,rhs) -> "Set("^x^","^string_of_expr rhs^")"
  | BeginEnd(es) -> "BeginEnd(" ^ String.concat "," (List.map string_of_expr es) ^")"
  | Debug(e) -> "Debug("^string_of_expr e^")"
and string_of_texpr = function
  | IntType -> "int"
  | BoolType -> "bool"
  | UnitType -> "unit"
  | FuncType(t1,t2) -> "("^string_of_texpr t1^"->"^string_of_texpr t2^")"
  | RefType(t) -> "Ref("^string_of_texpr t^")"
  | PairType(t1, t2) -> "<" ^ string_of_texpr t1 ^ "*" ^ string_of_texpr t2 ^ ")"
  | ListType(t) -> "list(" ^ string_of_texpr t ^ ")"
  | TreeType(t) -> "tree(" ^ string_of_texpr t ^ ")"



