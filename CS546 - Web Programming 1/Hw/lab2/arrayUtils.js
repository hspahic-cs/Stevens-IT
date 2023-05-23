/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

import * as Helper from "./helpers.js";

// NOTE: DOUBLE CHECK ERROR FOR (console.log(sortAndFilter(['location', 'asc'], ['name', 'asc'], 'age', '22'));
export let sortAndFilter = (array, sortBy1, sortBy2, filterBy, filterByTerm) => {
  // ~~~~~~~~~~~~~~~~~~~~~~~ ERROR CHECKING ~~~~~~~~~~~~~~~~~~~~~~~~~

  // Error checking for 'array' 
  if(array == null) throw `sortAndFilter: array does not exist`
  if(sortBy1 == null) throw `sortAndFilter: sortBy1 does not exist`
  if(sortBy2 == null) throw `sortAndFilter: sortBy2 does not exist`
  if(filterBy == null) throw `sortAndFilter: filterBy does not exist`
  if(filterByTerm == null) throw `sortAndFilter: filterByTerm does not exist`
  
  if(!Array.isArray(array)) throw `sortAndFilter: array MUST be an array!`
  if(array.length < 2) throw `sortAndFilter: array MUST have 2 or more elements!`
  if(!array.every(x => typeof(x) == "object" && x != null)) throw `sortAndFilter: array contains NON object or empty object!`
  
  let keys = Object.keys(array[0])

  if(!keys.every((val) => typeof(val) == "string" && val.trim() != "")) throw `sortAndFilter: array has an invalid key!`
  if(keys.length == 0) throw `sortAndFilter: array contains EMPTY object element!`

  for (let obj of array){
    for(let key of keys){
      if(!Object.keys(obj).includes(key)) throw  `sortAndFilter: array objects don't have the same keys!`
    }
    if(!Object.values(obj).every((val) => typeof(val) == "string" && val.trim() != "")) throw `sortAndFilter: array has a non-string value!`
  }
  
  // Error checking for 'sortBy1'
  if(!Array.isArray(sortBy1)) throw `sortAndFilter: sortBy1 MUST be an array!`
  if(sortBy1.length != 2) throw `sortAndFilter: sortBy1 MUST have EXACTLY 2 elements!`
  if(!sortBy1[0] || !sortBy1[1]) throw `sortAndFilter: sortBy1 contains empty elements!`
  if(typeof(sortBy1[0]) != "string" || sortBy1[0].trim() == "") throw `sortAndFilter: sortBy1[0] does not contain strings!`
  if(typeof(sortBy1[1]) != "string" || sortBy1[1].trim() == "") throw `sortAndFilter: sortBy1[1] does not contain strings!`
  if(!(keys.includes(sortBy1[0]))) throw `sortAndFilter: sortBy1 contains invalid key!`
  if(sortBy1[1] != 'asc' && sortBy1[1] != 'desc') throw `sortAndFilter: sortBy1 contains invalid order!`

  // Error checking for 'sortBy2'
  if(!Array.isArray(sortBy2)) throw `sortAndFilter: sortBy2 MUST be an array!`
  if(sortBy2.length != 2) throw `sortAndFilter: sortBy2 MUST have EXACTLY 2 elements!`
  if(!sortBy2[0] || !sortBy2[1]) throw `sortAndFilter: sortBy2 contains empty elements!`
  if(typeof(sortBy2[0]) != "string" || sortBy2[0].trim() == "") throw `sortAndFilter: sortBy2[0] does not contain strings!`
  if(typeof(sortBy2[0]) != "string" || sortBy2[1].trim() == "") throw `sortAndFilter: sortBy2[1] does not contain strings!`
  if(!(keys.includes(sortBy2[0]))) throw `sortAndFilter: sortBy2 contains invalid key!`
  if(sortBy2[1] != 'asc' && sortBy2[1] != 'desc') throw `sortAndFilter: sortBy2 contains invalid order!`

  // Error checking for 'filterBy' & 'filterByTerm
  if(!(keys.includes(filterBy))) throw `sortAndFilter: ${filterBy} does NOT belong to object keys!`
  if(typeof(filterByTerm) != 'string' || !filterByTerm || filterByTerm.trim() == "") throw `sortAndFilter: filterByTerm is NOT a valid string!`
  if(array.every(x => x[filterBy] != filterByTerm)) throw `sortAndFilter: filterByTerm missing from all objects!`

  // ~~~~~~~~~~~~~~~~~~~~~~ EXECUTION ~~~~~~~~~~~~~~~~~~~~~~~~~

  // Sort first term
  if (typeof(array[0][sortBy1[0]]) == "string"){
    array = Helper.sortHelper(array, sortBy1[0], "string", sortBy1[1])
  } 
  else{
    array = Helper.sortHelper(array, sortBy1[0], "number", sortBy1[1])
  }
  
  // Sort second term
  if (typeof(array[0][sortBy2[0]]) == "string"){
    array = Helper.subSort(array, sortBy1[0], sortBy2[0], "string", sortBy2[1])
  } 
  else{
    array = Helper.subSort(array, sortBy1[0], sortBy2[0], "number", sortBy2[1])
  }

  // Filter for filterByTerm
  return array.filter((x) => x[filterBy] == filterByTerm)
};

export let merge = (...args) => {
  //this function takes in a variable number of arrays that's what the ...args signifies
  // ~~~~~~~~~~~~~~~~~ ERROR CHECKING ~~~~~~~~~~~~~~~~~~~~~
  if (args.length == 0) throw("Args is empty!")
  
  for(let arr of args){
    if(!Array.isArray(arr)) throw("Element in args is not an array!")
    if(arr.length < 1) throw("Element in args doesn't have an element!")
  }

  // ~~~~~~~~~~~~~~~~~ EXECUTION ~~~~~~~~~~~~~~~~~~
  let unpacked_arrays = Helper.unpackArray(args)
  let int_values = [], string_values = []

  // Checking if all values of the correct type
  for (let elem of unpacked_arrays){
    if(typeof(elem) != "number" && typeof(elem) != "string") throw("Element in array is not of correct type!")
  }

  for(let x of unpacked_arrays){
    if(typeof(x) == "number"){
      int_values.push(x)
    }
  }

  for(let y of unpacked_arrays){
    if (typeof(y) == "string"){
      string_values.push(y)
    }
  }

  int_values.sort((x, y) => x - y)
  string_values.sort()
  
  return int_values.concat(string_values)
};

export let matrixMultiply = (...args) => {
  //this function takes in a variable number of arrays that's what the ...args signifies

  // ~~~~~~~~~~~~~~~~~ ERROR CHECKING ~~~~~~~~~~~~~~~~~~~~~
  if (args.length < 2) throw 'matrixMultiply: less than 2 inputs provided'

  let dims = []

  for(let arg of args){
    if(!Array.isArray(arg)) throw `matrixMultiply: args contains arg: [${arg}] which is not a 2D arrays`
    if(arg.length == 0) throw `matrixMultiply: args contains empty array`

    let num_rows = 0; let num_cols = 0;
    num_rows = arg.length
    num_cols = arg[0].length

    for(let row of arg){
      if(!Array.isArray(row)) throw `matrixMultiply: args contains arg: [${arg}] which is not a 2D array`
      if(num_cols != row.length) throw `matrixMultiply: arg: [${arg}] has 2 rows of different sizes`
      if(row.length === 0) throw `matrixMultiply: args contains a 2D array with an empty array`
      if(!row.every(x => typeof(x) === "number")) throw `matrixMultiply: arg: [${arg}] contains non number values`
    }

    dims.push([num_rows, num_cols])
  }

  let result = args[0]
  let result_dim = dims[0]

  for(let i = 0; i < args.length - 1; i++){
    // Check if dimensions for multiplication are correct
    if(result_dim[1] != dims[i+1][0]) throw 'matrixMultiply: dimensions do not support matrix multiplcation'
    result = Helper.doubleMatrixMultiply(result, args[i+1], result_dim, dims[i+1])
    result_dim = [result.length, result[0].length]
  }

  return result
};



