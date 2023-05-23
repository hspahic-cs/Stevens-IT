(*

NAME1: Hiya Bhavsar

NAME2: Harris Spahic

*)


(* Sample Directed Graph *)

let ex = [(1, 2); (2, 3); (3, 1); (3, 4)]


(*
  1 <------- 3
  |      //| |
  |     /    |
  |    /     |
 \/  /      \/
  2          4
*)

(*
Eg. outgoing ex 3 => [1;4]
*)
let rec outgoing_nodes g n = 
  match g with
  | [] -> []
  | (x,y)::t when x = n -> y :: (outgoing_nodes t n)
  | h::t -> (outgoing_nodes t n)

(*
   The list of nodes of the tree without duplicates. The order of the
   nodes in the list is irrelevant.
   eg. nodes ex => [1;2;3;4]
*) 

let rec mem e l =
  match l with
  | [] -> false
  | h::t -> h = e || mem e t 

let rec remove_dupl l =
  match l with
  | [] -> []
  | h::t when (mem h t) -> remove_dupl t
  | h::t -> h :: remove_dupl t 
  

let rec get_nodes g =
  match g with
  | [] -> [] 
  | (x,y)::t -> x::y::get_nodes t  
    
let rec nodes g =
  remove_dupl (get_nodes g)


(*
   Remove a node from the graph
   Eg. remove ex 2 =>  [(3, 1); (3, 4)]
*)
let rec remove g n =
  failwith "implement me"

(* Reachable nodes from a source node. (Extra-credit)
   Eg. reachale ex 3 => [1,;4;2;3]
*)

let rec reachable g n =
  failwith "implement"
  
(* 
  Determining types in compile time using logic branching --> Cs 135 problem
*)
      
      