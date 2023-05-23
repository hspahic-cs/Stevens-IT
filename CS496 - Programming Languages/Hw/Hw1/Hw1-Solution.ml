type program = int list
let square : program = [0; 2; 2; 3; 3; 4; 4; 5; 5; 1]
let letter_e : program = [0;2;2;3;3;5;5;4;3;5;4;3;3;5;5;1]

(* 
  NAME: Harris Spahic
  PLEDGE: I pledge my honor I have abided by the Steven's Honor System. 

  FUNCTIONS
  mirror_image     -> 1
  rotate_90_letter -> 1
  rotate_90_word   -> 1
  repeat           -> 1
  pantograph       -> 1
  pantograph_nm    -> 1
  pantrograph_f    -> 1
  coverage         -> 1
  compress         -> 1
  decompress       -> 1
  decompress_m     -> 1
  decompress_f     -> 1
  optimize         -> 1
 *)


let flip_command i =  
  if i = 2 then 4
  else if i = 4 then 2
  else if i = 3 then 5
  else if i = 5 then 3
  else i;; 

let mirror_image l = 
  List.map flip_command l 

let rotate_90_helper i = 
  if i = 0 || i = 1 then i
  else if i = 2 then 5
  else i - 1;;

let rotate_90_letter l =
  List.map rotate_90_helper (mirror_image l)
    
let rotate_90_word l = 
  List.map rotate_90_letter l
  
let rec repeat n x = 
  if n = 0 then []
  else x :: repeat (n-1) x 

let pant_helper n e =
  match e with
  | 0 -> [0]
  | 1 -> [1] 
  | e -> repeat n e 
           
let pantograph n l=
  List.concat (List.map (pant_helper n) l)

let rec pantograph_nm n l=
  match l with 
  | [] -> []
  | h::t when not (h = 0) && not (h = 1) -> repeat n h @ pantograph_nm n t
  | h::t -> h :: pantograph_nm n t 
  
let pantograph_f n l = 
  List.fold_right (fun h r -> (pant_helper n h) @ r ) l [] 

let move cord i =
  match cord with
  | (x,y) when i < 2 -> (x, y)
  | (x,y) when i = 2 -> (x, y+1)
  | (x,y) when i = 3 -> (x+1, y)
  | (x,y) when i = 4 -> (x, y-1)
  | (x,y) when i = 5 -> (x-1, y)
  | (x,y) -> (x,y)
              
let rec coverage cord l = 
  match l with 
  | [] -> [cord]
  | h::t -> cord :: coverage (move cord h) t 

let rec compress_helper p l c = 
  match l with 
  | [] -> [(p, c)]
  | h::t when h == p -> compress_helper h t (c+1)
  | h::t -> (p, c) :: (compress_helper h t 1)

let compress l =
  compress_helper (List.hd l) l 0;;

let uncompress_m l = 
  List.concat (List.map (fun a -> repeat (snd a) (fst a)) l)

let uncompress_f l =
  List.fold_right (fun h r -> (repeat (snd h) (fst h)) @ r) l []

let rec clean_list l p =
  match l with 
  | [] -> []
  | (x,y)::t when not ((x == 0) || (x == 1)) -> (x,y) :: (clean_list t p)
  | (x,y)::t when (x == p) -> clean_list t p
  | (x,y)::t -> (x, 1) :: (clean_list t x)

let optimize l =
  (uncompress_m (clean_list (compress l) 1));;