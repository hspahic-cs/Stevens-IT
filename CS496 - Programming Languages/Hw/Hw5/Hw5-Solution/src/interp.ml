open Ast
open ReM
open Ds

let g_store = Store.empty_store 20 (NumVal 0)

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
  | Int(n) -> return @@ NumVal n
  | Var(id) -> apply_env id
  | Unit -> return UnitVal
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
  | Let(v,def,body) ->
    eval_expr def >>= 
    extend_env v >>+
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
  | Pair(e1,e2) ->
    eval_expr e1 >>= fun ev1 ->
    eval_expr e2 >>= fun ev2 ->
    return @@ PairVal(ev1,ev2)
  | Unpair(id1,id2,def,body) ->
    eval_expr def >>=
    pair_of_pairVal >>= fun (g,d) ->
    extend_env id1 g >>+
    extend_env id2 d >>+
    eval_expr body 
  | Proc(id,_t,e)  ->
    lookup_env >>= fun en ->
    return (ProcVal(id,e,en))
  | App(e1,e2)  -> 
    eval_expr e1 >>= fun v1 ->
    eval_expr e2 >>= fun v2 ->
    apply_proc v1 v2
  | Letrec(id,par,_targ,_ty,e,target) ->
    extend_env_rec id par e >>+
    eval_expr target 
  | BeginEnd(es) ->
    List.fold_left (fun c e -> c >>= fun _ -> eval_expr e) (return UnitVal) es
  | NewRef(e) ->
    eval_expr e >>= fun ev ->
    return @@ RefVal (Store.new_ref g_store ev)
  | DeRef(e) ->
    eval_expr e >>=
    int_of_refVal >>= 
    Store.deref g_store 
  | SetRef(e1,e2) ->
    eval_expr e1 >>=
    int_of_refVal >>= fun v1 ->
    eval_expr e2 >>= fun v2 ->
    Store.set_ref g_store v1 v2 >>= fun _ ->
    return UnitVal
  (* | Record(fs) ->
   *   mapM (fun (id,e) ->
   *                eval_expr en e >>= fun v -> return (id,v)) fs >>=
   *   fun evs -> return @@ RecVal evs
   * | Proj(e,field_id) ->
   *   eval_expr en e >>=
   *   list_of_recVal >>= 
   *   fun fs -> (match List.assoc_opt field_id fs with
   *       | None -> error "Field not found"
   *       | Some e -> return e) *)
        | Cons(e1, e2) ->
    eval_expr e1 >>= fun v1 ->
    eval_expr e2 >>= 
    list_of_listVal >>= fun l1 -> 
    return @@ ListVal (v1 :: l1)
  | Hd(e1)      ->
    eval_expr e1 >>= 
    list_of_listVal >>= fun l1 ->
    return @@ List.hd l1
  | Tl(e1)      ->
    eval_expr e1 >>=
    list_of_listVal >>= fun l1 ->
    return @@ ListVal (List.tl l1)
  | IsNullL(e1)     ->
    eval_expr e1 >>= fun v1 -> 
    list_of_listVal v1 >>= fun l1 ->
      return @@ BoolVal (l1 = [])      
  | IsNullT(e1)     ->
    eval_expr e1 >>= fun v1 -> 
    tree_of_treeVal v1 >>= fun t1 ->
    return @@ BoolVal (t1 = Empty) 
  | EmptyList(_t)    -> return @@ ListVal []
  | EmptyTree(_t) -> return @@ TreeVal Empty
  | Node(e1,lte,rte) ->
    eval_expr e1 >>= fun data ->
    eval_expr lte >>=
    tree_of_treeVal >>= fun lt -> 
    eval_expr rte >>=
    tree_of_treeVal >>= fun rt -> 
    return @@ TreeVal (Node(data,lt,rt))
  | GetData(e) ->
    eval_expr e >>= 
    tree_of_treeVal >>= fun t -> 
    (match t with
     | Node(i,_,_) -> return i
     | _ -> error "Empty tree")
  | GetLST(e) ->
    eval_expr e >>= 
    tree_of_treeVal >>= fun t -> 
    (match t with
     | Node(_,lt,_) -> return (TreeVal lt)
     | _ -> error "Empty tree")
  | GetRST(e) ->
     eval_expr e >>= 
    tree_of_treeVal >>= fun t -> 
    (match t with
     | Node(_,_,rt) -> return (TreeVal rt)
     | _ -> error "Empty tree")
  | Debug(_e) ->
    string_of_env >>= fun str_env ->
    Store.string_of_store string_of_expval g_store >>= fun str_store ->
    print_endline (str_env^str_store);
    error "Debug: reached breakpoint"
  | _ -> error ("Not implemented: "^string_of_expr e)


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

