(* Hiya Bhavsar & Harris Spahic
I pledge my honor that I have abided by the Stevens Honor System. *)
open Ast
open ReM
open Dst


let rec chk_expr : expr -> texpr tea_result = function 
  | Int _n -> return IntType
  | Var id -> apply_tenv id
  | IsZero(e) ->
    chk_expr e >>= fun t ->
    if t=IntType
    then return BoolType
    else error "isZero: expected argument of type int"
  | Add(e1,e2) | Sub(e1,e2) | Mul(e1,e2)| Div(e1,e2) ->
    chk_expr e1 >>= fun t1 ->
    chk_expr e2 >>= fun t2 ->
    if (t1=IntType && t2=IntType)
    then return IntType
    else error "arith: arguments must be ints"
  | ITE(e1,e2,e3) ->
    chk_expr e1 >>= fun t1 ->
    chk_expr e2 >>= fun t2 ->
    chk_expr e3 >>= fun t3 ->
    if (t1=BoolType && t2=t3)
    then return t2
    else error "ITE: condition not boolean or types of then and else do not match"
  | Let(id,e,body) ->
    chk_expr e >>= fun t ->
    extend_tenv id t >>+
    chk_expr body
  | Proc(var,t1,e) ->
    extend_tenv var t1 >>+
    chk_expr e >>= fun t2 ->
    return @@ FuncType(t1,t2)
  | App(e1,e2) ->
    chk_expr e1 >>=
    pair_of_funcType "app: " >>= fun (t1,t2) ->
    chk_expr e2 >>= fun t3 ->
    if t1=t3
    then return t2
    else error "app: type of argument incorrect"
  | Pair(e1,e2) ->
    chk_expr e1 >>= fun t1 ->
    chk_expr e2 >>= fun t2 ->
    return @@ PairType(t1,t2)
  | Unpair(id1,id2,e1,e2) ->
    chk_expr e1 >>=
    pair_of_pairType "unpair: " >>= fun (t1,t2) ->
    extend_tenv id1 t1 >>+
    extend_tenv id2 t2 >>+
    chk_expr e2  
  | Letrec(id,param,tParam,tRes,body,target) ->
    extend_tenv id (FuncType(tParam,tRes)) >>+
    (extend_tenv param tParam >>+
     chk_expr body >>= fun t ->
     if t=tRes 
     then chk_expr target
     else error
         "LetRec: Type of recursive function does not match
declaration")
  (* EXPLICIT-REFS *)
  | BeginEnd([]) ->
    return UnitType
  | BeginEnd(es) ->
    List.fold_left(fun e1 en -> e1 >>= fun t1 -> chk_expr en) (return UnitType) es 
  | NewRef(e) ->
    chk_expr e >>= fun t1 ->
    return @@ RefType(t1)
  | DeRef(e) ->
    chk_expr e >>= fun t1 ->
    (match t1 with
    |RefType(t) -> return t
    |_-> error "newref: Expected a reference type")
  | SetRef(e1,e2) ->
    chk_expr e1 >>= fun t1 ->
    chk_expr e2 >>= fun t2 ->
    (match t1 with
    |RefType(t) -> if t2 = t then return UnitType else error "setref: Argument type mismatch"
    |_-> error "setref: Expected a reference type")

 
  (* list *)
  | EmptyList(t) ->
    return @@ ListType(t)
  | Cons(h, t) ->
    chk_expr h >>= fun t1 ->
    chk_expr t >>= fun t2 ->
    (match t2 with
    |ListType(t) -> if t1 = t then return t2 else error "cons: Type of head and tail do not match"
    |_-> error "cons: Tail is not of type list")
  | IsNullL(e) ->
    chk_expr e >>= fun t1 ->
    (match t1 with
    |ListType(t) -> return BoolType
    |_-> error "isNullL: Argument must be of type list")
  | Hd(e) ->
    chk_expr e >>= fun t1 ->
    (match t1 with
    |ListType(t) -> return t1
    |_-> error "hd: Argument must be of type list")
  | Tl(e) ->
    chk_expr e >>= fun t1 ->
    (match t1 with
    |ListType(_) -> return t1
    |_-> error "tl: Argument must be of type list")

  (* tree *)
  | EmptyTree(t) ->
    return @@ TreeType(t)
  | Node(de, le, re) ->
    chk_expr de >>= fun t1 ->
    chk_expr le >>= fun t2 ->
    chk_expr re >>= fun t3 ->
    if t2=t3 then
    (match t2 with
    |TreeType(t) -> if t1=t then return t3 else error "node: Argument type mismatch"
    |_-> error "node: Expected a tree type")
    else error "node: Argument type mismatch"
  | IsNullT(t) ->
    chk_expr t >>= fun t1 ->
    (match t1 with
    |TreeType(t) -> return BoolType
    |_-> error "isnullT: Expected a tree type")
  | GetData(t) ->
    chk_expr t >>= fun t1 ->
    (match t1 with
    |TreeType(t) -> return t
    |_-> error "getdata: Expected a tree type")
  | GetLST(t) ->
    chk_expr t >>= fun t1 ->
    (match t1 with
    |TreeType(t) -> return t1
    |_-> error "getLST: Expected a tree type")
  | GetRST(t) ->
    chk_expr t >>= fun t1 ->
    (match t1 with
    |TreeType(t) -> return t1
    |_-> error "getRST: Expected a tree type")

  | Debug(_e) ->
    string_of_tenv >>= fun str ->
    print_endline str;
    error "Debug: reached breakpoint"
  | _ -> error "chk_expr: implement"    



let parse s =
  let lexbuf = Lexing.from_string s in
  let ast = Parser.prog Lexer.read lexbuf in
  ast


(* Type-check an expression *)
let chk (e:string) : texpr result =
  let c = e |> parse |> chk_expr
  in run_teac c

let chkpp (e:string) : string result =
  let c = e |> parse |> chk_expr
  in run_teac (c >>= fun t -> return @@ Ast.string_of_texpr t)



