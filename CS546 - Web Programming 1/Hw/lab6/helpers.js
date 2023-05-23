// You can add and export any helper functions you want here - if you aren't using any, then you can just leave this file as is

import { ObjectId } from "mongodb"

// Error checking functions
export let checkString = (input, var_name, func_name) => {
    if(!input) throw `${func_name}: ${var_name} undefined!`
    if(typeof(input) != "string") throw `${func_name}: ${var_name} is not a string!`
    if(input.trim() === "") throw `${func_name}: ${var_name} is empty!`
    
    return input.trim()
}

export let checkNumber = (input, var_name, func_name) =>{
    if(!input) throw `${func_name}: ${var_name} undefined!`
    if(typeof(input) != "number") throw `${func_name}: ${var_name} is not a number!`
    
    return input
}

export let checkArray = (input, var_name, func_name, array_type = undefined) => {
    if(!input) throw `${func_name}: ${var_name} undefined!`
    if(!Array.isArray(input)) throw `${func_name}: ${var_name} is not an array!`
    if(array_type){if(!input.every(element => typeof(element) === array_type)) throw `${func_name}: ${var_name} has elements of type ${array_type}!`}
    if(array_type === "string"){
        if(!input.every(element => element.trim() != "")){throw `${func_name}: ${var_name} contains empty strings!`}
        else{input = input.map(element => element.trim())}}

    return input
}

export let checkId = (id, var_name, func_name) => {
    if(!id) throw `${func_name}: ${var_name} undefined!`
    if(typeof id != "string") throw `${func_name}: ${var_name} not valid type!`
    id = id.trim()
    if(id === "") throw `${func_name}: ${var_name} is an empty string!`
    if(!ObjectId.isValid(id)) throw `${func_name}: ${var_name} not valid id!`
    return id
}