
Page
1
of 4
(* First examples of recursion in OCaml 
28 Jan 2022
*)
(* Recursion on numbers *)
let rec fact n =
  match n with
  | m when m<0 -> failwith "invalid input"
  | 0 -> 1
  | m -> m * fact (n-1)
(* 
 0 -> 1
 is a branch of the match.
 0 is the pattern
*)
(* ex:
repeat 3 "hello" => ["hello";"hello";"hello"]
Precondition: n is positive 
*)
let rec repeat n e =
  match n with
  | 0 -> []
  | m -> e :: repeat (n-1) e
  
(* Optional: adding type annotations 
*)
let rec repeat' (n:int) (e:'a) : 'a list =
  match n with
  | 0 -> []
  | m -> e :: repeat' (n-1) e
(* Recursion on lists *)
let rec sizel l =
  match l with
  | [] -> 0
  | h::t -> 1 + sizel t
let rec suml l =
  match l with
  | [] -> 0
  | h::t -> h + suml t
let rec mem e l =
  match l with
  | [] -> false
  | h::t -> h=e || mem e t
let rec rev l =
  failwith "complete"
let rec last l =
  failwith "complete"
let rec has_duplicates l =
  failwith "complete"
let rec sublist l1 l2 =
  failwith "complete"
let rec concatenate l1 l2 =
  failwith "complete"
(* 
   Some standard higher-order function schemes 
   map, filter, fold
*)
(* map *)
    
let inc i = i+1
let upper c = Char.uppercase_ascii c
let isz i = i=0
            
let rec succl : int list -> int list =
  fun l ->
  match l with
  | [] -> []
  | h::t -> inc h :: succl t
let rec upperl : char list -> char list =
  fun l ->
  match l with
  | [] -> []
  | h::t -> upper h :: upperl t
let rec is_zerol : int list -> bool list =
  fun l ->
  match l with
  | [] -> []
  | h::t -> isz h :: is_zerol t
let rec map : ('a ->'b ) -> 'a list -> 'b list =
  fun f l ->
  match l with
  | [] -> []
  | h::t -> f h :: map f t
let succl' l = map inc l
let upperl' l = map upper l
let is_zerol' l = map isz l
(* filter *)
let is_pos i = i>0
let is_uc c = Char.uppercase_ascii c=c
let is_ne l = l<>[]
                 
let rec gtz : int list -> int list =
  fun l ->
  match l with
  | [] -> []
  | h::t ->
    if is_pos h
    then h::gtz t
    else gtz t
        
let rec uppercase : char list -> char list =
  fun l ->
  match l with
  | [] -> []
  | h::t ->
    if is_uc h
    then h::uppercase t
    else uppercase t
      
let rec non_empty : 'a list list -> 'a list list =
  fun l->
  match l with
  | [] -> []
  | h::t ->
    if is_ne h
    then h::non_empty t
    else non_empty t
let rec filter :  ('a -> bool ) -> 'a list -> 'a list =
  fun p l ->
  match l with
  | [] -> []
  | h::t ->
    if p h
    then h::filter p t
    else filter p t
let gtz' l = filter is_pos l
let uppercase' l = filter is_uc l
let non_empty' l = filter is_ne l
(* fold *)
let rec suml : int list -> int =
  fun l ->
  match l with
  | [] -> 0
  | h::t -> h + suml t
 let rec andl : bool list -> bool =
    fun l ->
    match l with
    | [] -> true
    | h::t -> h && andl t
                
let rec concat : 'a list list -> 'a list =
  fun l ->
  match l with
  | [] -> []
  | h::t -> h @ concat t
let rec fold_right :('a -> 'b -> 'b ) -> 'b -> 'a list -> 'b  =
  fun f a l ->
  match l with
  | [] -> a
  | h::t -> f h (fold_right f a t)
let suml' l = fold_right (fun h r -> h+r) 0 l
let andl' l = fold_right (fun h r -> h && r) true l
let concat' l = fold_right (fun h r -> h @ r) [] l
(* 
 fold_right f a [x1;x2;x3]
=>
  f x1 (f x2 (f x3 a)))
*)
(* Exercise 
Think about the functions you worked on in Quiz 1 and see if you can
make use of any of the above higher-order function schemes.
a) outgoing_nodes
b) nodes
*)
    
(* Algebraic Data Types 
   On Mon 7 Feb.
*)