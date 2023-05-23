(* 
   Algebraic Data Types
   7 Feb 2022
*)
type fruit = Apple | Orange | Kiwi
(* Apple, Orange and Kiwi are called constructors.
   Constructors start with a capital letter *)
             
type color = R | G | B
let next : color -> color =
  fun c ->
  match c with
  | R -> G
  | G -> B
  | B -> R
type flavor = Van | Cho | Str
(* Constructors may have an argument *)
type icecream  = Cone of flavor | Cup of flavor*flavor |
                 Bucket of flavor list
let ic1 = Cone(Cho)
let ic2 = Cup(Str,Van)
let ic3 = Bucket [Van;Van;Van;Cho]
let price : icecream -> int =
  fun ic ->
  match ic with
  | Cone(_) -> 1
  | Cup(_,_) -> 2
  | Bucket(_) -> 5
let boring : icecream -> bool =
  fun ic ->
  match ic with
  | Cone(Van) | Cup(Van,Van) -> true
  | Bucket(l) -> List.for_all (fun f -> f=Van) l
  | _ -> false
(* polymorphic ADT *)
type 'a result = None | Some of 'a
                 
let rec lookup : 'a -> ('a*'b) list -> 'b result =
  fun k d ->
  match d with
  | [] ->None
  | (k',v)::t ->
    if k=k'
    then Some v
    else lookup k t
type ('a,'b) either = Left of 'a | Right of 'b
(* Binary trees *)
type 'a bt = Empty | Node of 'a*'a bt*'a bt
(*
      33
    /   \
   12   77
    \     \
    14    104
*)
let t1 : int bt =
  Node(33,
       Node(12,
            Empty,
            Node(14,Empty,Empty)),
       Node(77,
            Empty,
            Node(104,Empty,Empty)))
let rec sizet : 'a bt -> int =
  fun t ->
  match t with
  | Empty -> 0
  | Node(_,lt,rt) -> 1 + sizet lt + sizet rt
let rec leaves t =
  match t with
  | Empty -> 0
  | Node(_,Empty,Empty) -> 1
  | Node(_,lt,Empty) -> leaves lt
  | Node(_,Empty,rt) -> leaves rt
  | Node(_,lt,rt) -> leaves lt + leaves rt
let rec mapt : ( 'a-> 'b) -> 'a bt -> 'b bt =
  fun f t ->
  match t with
  | Empty -> Empty
  | Node(d,lt,rt) -> Node(f d,mapt f lt,mapt f rt)
let rec foldt f a t =
  match t with
  | Empty -> a
  | Node(d,lt,rt) -> f d (foldt f a lt) (foldt f a rt)
