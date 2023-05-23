(*

NAME1:

NAME2:

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
  failwith "implement me"

(* 
   The list of nodes of the tree without duplicates. The order of the
   nodes in the list is irrelevant.
   eg. nodes ex => [1;2;3;4] 
*)

let rec nodes g =
   failwith "implement me"

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

