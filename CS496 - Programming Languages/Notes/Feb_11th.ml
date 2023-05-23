(* Alright we gone test these function it be easy up in here *)
let list = [1;2;3;4;5]

let square x = (x * x)
 
let rec sum_squares : int list -> int =
    fun l ->
    match l with
    | [] -> 0
    | h::t ->  square(h) + sum_squares t

let sum_squares_f : int list -> int =
    fun l ->
    List.fold_right (fun h r -> (square h) + r) l 0

let all_fives : int list -> bool = 
    fun l ->
    List.fold_right(fun h r -> if h == 5 then r else false) l true

let rec zip : 'a list -> 'b list -> ('a * 'b) list = 
    fun l f -> 
    match (l, f) with 
    | ([], []) -> ([])
    | h1::t1, h2::t2 -> (h1,h2) :: (zip t1 t2)
    | _, _ -> failwith "There seems to be an error"

let dot_product : int list -> int list -> int = 
    fun l f ->
    List.fold_right (fun h r -> fst h * snd h + r) (zip l f) 0 
    