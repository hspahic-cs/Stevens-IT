
(*
     Jan 31 - First on-campus lecture of the semester
     Review of some basic functions over lists
*)
let rec prodl (l:int list) : int =
  match l with
  | [] -> 1
  | h::t -> h * prodl t
let rec prodl' : int list -> int  =
  fun l ->
  match l with
  | [] -> 1
  | h::t -> h * prodl' t
(* 
   Given a list of pairs of numbers write a function add_all that adds
   up all the numbers in all the pairs.
   Solution illustrates use of nested patterns.
*)
let rec add_all l =
  match l with
  | [] -> 0
  | (x,y)::t -> x+y+add_all t
let is_list_of_length_2 l = List.length l=2
(* 
Example of a function on lists that involves patterns different than
 [] and h::t  
Remove adjacent duplicates 
rad [1;1;1;2;3;3;4;1;1]
=>
[1;2;3;4;1]
Solution illustrates use of match where the branches have patterns different from 
[] and h::t.
*)
let rec rad :'a list -> 'a list =
  fun l ->
  match l with
  | [] -> []
  | [x] -> [x]
  | x::y::t when x=y -> rad (y::t)
  | x::y::t -> x :: rad (y::t)
    
(*
Exercises left pending from recorded lecture on Friday:
rev
last
has_duplicates
sublist
concatenate
*)
let rec mem :'a -> 'a list -> bool =
  fun e l ->
  match l with
  | [] -> false
  | h::t -> h=e || mem e t
let rec has_duplicates l =
  match l with
  | [] -> false
  | h::t -> mem h t || has_duplicates t
let rec repeat e n =
  match n with
  | 0 -> []
  | m -> e :: repeat e (m-1)