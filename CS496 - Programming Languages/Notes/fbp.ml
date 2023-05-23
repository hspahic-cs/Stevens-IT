

(* Fruit Basket Processors *)

type fruit = A | O | K
type fbasket = fruit list
let fb1 = [A;A;A;O;O;A;K;K;K;O;O]
let fb2 = [A;A;A;A;K;K;K]

type 'a result = Ok of 'a | Error of string

(*
    A fruit basket processor (fbp) is an expression whose type is an instance of the type:  
     fbasket -> 'a result
*)

(* Exercise 1. Define the following fbp 
   This particular fbp never returns an error *)

let no_of_apples : fbasket -> int result =
  fun fb ->
  Ok (List.length (List.filter(fun f -> f = A) fb)) 

let no_of_oranges : fbasket -> int result =
  fun fb ->
  Ok (List.length (List.filter(fun f -> f = O) fb)) 

let no_of_kiwis : fbasket -> int result =
  fun fb ->
  Ok (List.length (List.filter(fun f -> f = K) fb)) 
         
let oranges_and_apples_ratio : fbasket -> int result = 
   fun fb ->
   let Ok noo = no_of_oranges fb
   and Ok noa = no_of_apples fb 
   in 
   if noa = 0
   then Error "no apples"
   else Ok(noo/noa)

let has_orange : fbasket -> bool result =
   fun fb ->
   match no_of_oranges fb with
   | Ok noo -> 
      if noo = 0
      then Ok(false)
      else Ok(true)
   | _ -> failwith "not possible"

let remove_one_orange: fbasket -> fbasket result =
   match fb with
   | [] -> []
   | O::t -> t
   | f::t -> f::remove_one_orange t

let remove_orange : fbasket -> fbasket result = 
   fun fb ->
   match fb with
   | Ok fb ->
      if (no_of_oranges fb) = 0
      then Error "No oranges to remove"
      else remove_one_orange fb

let sum_fbp : (fbasket -> int result) -> (fbasket -> int result) -> (fbasket -> int result) = 
   fun fbp1 fbp2 ->
   fun fb ->
   match fbp1 fb with
   | Error s -> Error s
   | Ok n ->
      (match fbp2 fb with
      | Error s -> Error s
      | Ok m -> Ok (m + n))

type 'a fbp = fbasket -> 'a result

let pair_fbp : 'a fbp -> 'b fbp -> ('a*'b) fbp = 
   fun fbp1 fbp2 ->
   fun fb ->
   match fbp1 fb with
   | Error s -> Error s
   | Ok n ->
      (match fbp2 fb with
      | Error s -> Error s
      | Ok m -> Ok (m, n))

let pair_fbp' = 
   fun fbp1 fbp2 ->
   fbp1 >>= fun n ->
   fbp2 >>= fun m ->
   const(n, m)

let const : 'a -> fbasket -> 'a result = 
   fun v -> 
   fun fb ->
   Ok v

let (>>=) : 'a fbp -> ('a -> 'b fbp) -> 'b fbp = 
   fun c f ->
   fun fb ->
   match c fb with  
   | Error s -> Error s
   | Ok v -> f v fb
