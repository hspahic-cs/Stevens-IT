(* 
   Quiz 2 - 18 Feb 2022

   Name1: 

   Name2:

*)


type 'a btree = Empty | Node of 'a * 'a btree * 'a btree

let t1 = Node(30,Node(20,Node(10,Empty,Empty),Empty),Empty)
let t2 = Node(4,
              Node(3,
                   Node(2,
                        Node(1,Empty,Empty),
                        Empty),
                   Empty),
              Node(5,
                   Empty,
                   Node(6,
                        Empty,
                        Node(7,Empty,Empty))))

let t3 = Node(12,
              Node(7,Empty,Empty),
              Node(24,
                   Node(18,Empty,Empty),
                   Empty))

(** Implement [level t i] which returns a list with all the nodes in
   [t] at level [i]. You may assume that [i] is greater than 0.
   1 is the first level. 
   If the level is greater than the height of the tree, then 
   it should return the empty list.
   Eg.
# level t2 1 ==> [4]
# level t2 2 ==> [3; 5]
# level t2 3 ==> [2; 6] 
# level t2 33 ==> [] 
*)
let rec level t i =
   failwith "implement"

(** Implement [levels t] which returns a list of lists, namely a list
   of the lists of nodes at each level. More precisely, the list at 
   index i consists of all the items in [t] at level i+1.
   Eg. 
   # levels t2 ==> [[4]; [3; 5]; [2; 6]; [1; 7]]
*)
                         
let rec levels t =
 failwith "implement"

(** Implement [pbt h d] that generates a perfect binary tree of a given height whose nodes contain [d] as
    data. The height is [h] is an integer greater or equal to zero.
    Eg.
 pbt 3 "a" ==>
 Node ("a", Node ("a", Node ("a", Empty, Empty), Node ("a", Empty, Empty)),
 Node ("a", Node ("a", Empty, Empty), Node ("a", Empty, Empty)))
   Eg.
 pbt 0 3 ==> Empty
*)
let rec pbt h d =
  failwith "implement"
           
(** Implement [paths_to_leaves t] which returns a list with all the paths from the root to a leaf 
    eg: 
    # paths_to_leaves t2;;
    - : int list list = [[0; 0; 0]; [1; 1; 1]] 
*)      
let rec paths_to_leaves t =
  match t with
  | Empty ->  failwith "implement"
  | Node(d,Empty,Empty) ->  failwith "implement"
  | Node(d,lt,rt) ->    failwith "implement"
                         
(** Implement [paths t] which returns a list with all the paths from the root to any node. 
    eg: 
    # paths t2;;
    - : int list list = [[0; 0; 0]; [0; 0]; [0]; [1; 1; 1]; [1; 1];
    [1]; []]
    
    If the tree is empty, then paths returns the empty list []
*)  
let rec paths t =
  match t with
  | Empty ->  failwith "implement"
  | Node(d,Empty,Empty) ->  failwith "implement"
  | Node(d,lt,rt) ->    failwith "implement"
