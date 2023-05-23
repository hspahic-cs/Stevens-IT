
(* 
  NAME: Harris Spahic
  PLEDGE: I pledge my honor I have abided by the Steven's Honor System. 

  FUNCTIONS
  height            -> 1
  size              -> 1
  paths_to_leaves   -> 1
  is_leaf_perfect   -> 1
  preorder          -> 1
  mirror            -> 1
  mapt              -> 1
  foldt             -> 1
  mirror'           -> 1
 *)

type 'a gt = Node of 'a*('a gt) list

let t : int gt =
    Node (33,
        [Node (12 ,[]);
        Node (77,
            [Node (37,
                [Node (14, [])]);
            Node (48, []);
            Node (103, [])])
])

let perfect : int gt = 
    Node (1, 
        [Node (2, [Node (4, [])]);
        Node (3, [Node (5, [])])
])

let mk_leaf (n: 'a) : 'a gt = 
    Node(n,[])

let max l = List.fold_right (fun h r -> if h > r then h else r) l 0

let rec height: 'a gt -> 'a = 
    fun gt -> 
    match gt with
    | Node(_, []) -> 1
    | Node(_, br) -> 1 + max (List.map height br)

let count_nodes l = List.fold_right (fun h r -> h + r) l 0

let rec size: 'a gt -> 'a = 
    fun gt -> 
    match gt with
    | Node(h, []) -> 1
    | Node(_, br) -> 1 + count_nodes(List.map size br)

let rec paths_to_leaves : 'a gt -> ((int) list) list =
    fun gt ->
    match gt with
    | Node(h, []) -> [[]]
    | Node(h, br) -> List.concat(List.mapi (fun i x -> List.map (fun x -> i::x) x) (List.map paths_to_leaves br))

let rec check_duplicates l = 
    match l with
    | [] -> true
    | hd::tl when tl == [] -> true
    | hd::tl -> if List.mem hd tl then check_duplicates tl else false

let rec is_leaf_perfect gt = 
    match gt with
    | Node(h, []) -> true
    | Node(_, br) -> if check_duplicates (List.map height br) then List.fold_right (fun h r -> h && r) (List.map is_leaf_perfect br) true else false

let rec preorder gt =
    match gt with
    | Node(h, []) -> [h]
    | Node(h, br) -> h :: List.concat (List.map preorder br)

let rec mirror gt = 
    match gt with
    | Node(h, []) -> Node(h, [])
    | Node(h, br) -> Node(h, (List.rev (List.map mirror br)))

let rec mapt f t =
    match t with
    | Node(h, []) -> Node(f h, [])
    | Node(h, br) -> Node(f h, (List.map (fun t -> mapt f t) br))

let rec foldt f t = 
    match t with
    | Node(h, br) -> f h (List.map (fun t -> foldt f t) br)

(* Testing functions for foldt *)
let sumt t =
    foldt (fun i rs -> i + List.fold_left (fun i j -> i+j) 0 rs) t

let memt t e =
    foldt (fun i rs -> i=e || List.exists (fun i -> i) rs) t   

(* Mirror using foldt *)

let mirror' t = 
    foldt (fun h rs -> Node(h, (List.rev rs))) t