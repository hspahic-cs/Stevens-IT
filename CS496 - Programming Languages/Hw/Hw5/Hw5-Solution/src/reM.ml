(* Expressed Result *)
                 
type 'a result = Ok of 'a | Error of string

type ('e,'a) a_result = 'e -> 'a result
  
let return : 'a -> ('e,'a) a_result =
  fun v ->
  fun _env ->
  Ok v

let error : string -> ('e,'a) a_result =
  fun s ->
  fun _env ->
  Error s

let (>>=) : ('e,'a) a_result -> ('a -> ('e,'b) a_result) -> ('e,'b) a_result =
  fun c f env ->
  match c env with
  | Error err -> Error err
  | Ok v -> f v env

let (>>+) : ('e,'e) a_result -> ('e,'a) a_result -> ('e,'a) a_result =  
  fun c d env ->
  match c env with
  | Error err -> Error err
  | Ok newenv -> d newenv

let lookup_env : ('e,'e) a_result =
  fun env ->
  Ok env
    
let sequence (cs: (('e,'a) a_result) list) : ('e,'a list) a_result  =
  let mcons p q = p >>= fun x -> q >>= fun y -> return (x::y)
  in List.fold_right mcons cs (return []) 

let mapM (f:'a -> ('e,'b) a_result) (vs:'a list) : ('e,'b list) a_result =
  sequence (List.map f vs)
