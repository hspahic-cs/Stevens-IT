/* Todo: Implment any helper functions below 
    and then export them for use in your other files.
*/

// ~~~~~~~~~~ HELPERS FOR error handling ~~~~~~~~~~~~~~

export let checkUndefined = (val, var_name) =>{
    if(!isNaN(val)) throw `${var_name} is NaN!`
    if(val == null) throw `${var_name} is null!`
}

export let checkString = (val, var_name, function_name) => {
    if(val == null) throw `${function_name}: ${var_name} is null or undefined`
    if(typeof(val) != "string") throw `${function_name}: ${var_name} is not a string!`
    if(val === "") throw `${function_name}: ${var_name} is an empty string!`
}

// ~~~~~~~~~~ HELPERS FOR "arrayUtils.js" ~~~~~~~~~~~~

export let sortHelper = (array, key, type, order) => {
    if(order == "asc"){
        if (type =="string"){
            return array.sort((x1, x2) => x1[key] > x2[key] ? 1 : x1[key] < x2[key] ? -1 : 0)
        } else {
            return array.sort((x1, x2) => x1[key] - x2[key]);
        }
    } else{
        if (type =="string"){
            return array.sort((x1, x2) => x1[key] > x2[key] ? -1 : x1[key] < x2[key] ? 1 : 0)
        } else {
            return array.sort((x1, x2) => x2[key] - x1[key]);
        }
    }
}

// Input array should've already called sortHelper
export let subSort = (array, primaryKey, subKey, type, order) => {
    let i = 0;
    let j = 0;
    let sublist = [];
    let array_cpy = [...array]

    while(i < array.length){
        let prev_val = array[i][primaryKey]

        while(j < array.length && prev_val == array[j][primaryKey]){
            sublist.push(array[j])
            j+=1
        }

        if(type == "string" && sublist.length > 1){
            sublist = sortHelper(sublist, subKey, "string", order)
        } else if(type == "number" && sublist.length > 1){
            sublist = sortHelper(sublist, subKey, "number", order)
        }
        
        array_cpy.splice(i, j - i, ...sublist) 
        i = j
        sublist.length = 0
    }

    return array_cpy
}

export let unpackArray = (array) => {
    let result = []
    
    for(let x of array){
        if (Array.isArray(x)){
            result = result.concat(unpackArray(x))
        } else{
            result.push(x)
        } 
    }

    return result
}

export let doubleMatrixMultiply = (M1, M2, dim1, dim2) =>{
    let result = []; 
    for(let i = 0; i < dim1[0]; i++){
        let row_vector = []
        
        for(let j = 0; j < dim2[1]; j++){
            let prod = 0;
        
            for(let k = 0; k < dim1[1]; k++){
                prod += M1[i][k] * M2[k][j]
            }
            row_vector.push(prod)
        }
        result.push(row_vector)
    }
    return result
} 

// ~~~~~~~~~~ HELPERS FOR "stringUtils.js" ~~~~~~~~~~~~

export let checkPalindrome = (string) => {
    let reverse = string.split("").reverse().join("")
    for(let i in string){
        if (string.charAt(i) != reverse.charAt(i)){
            return false
        }
    }

    return true
}

export let replaceWordWithCensor = (string) => {
    let censor = ['!', '@', '$', '#']
    let array = string.split("")
    
    for(let i in array){
        array[i] = censor[i % 4]
    }

    return array.join("")
}

export let findIndex = (string, target) => {
    let i = 0; let j = 0;
    let indices = []

    while(i <= string.length - target.length){
        while(j < target.length){
            if(string[i + j] != target[j]){break}
            if(j + 1 == target.length) {indices.push(i)}
            j+=1
        }
        i+=1
        j=0
    }

    return indices
}

export let includesString = (string, target) =>{
    for(let x of target){
        if(!string.includes(x)) return false
    }
    return true
}

export let findMinDifference = (arr1, arr2) =>{
    let min = Number.MAX_VALUE
    for(let x of arr1){
        for(let y of arr2){
            if(y - x < min && y - x > 0){
                min = y - x
            }
        }
    }
    return min
}

// ~~~~~~~~~~ HELPERS FOR "objectsUtils.js" ~~~~~~~~~~~~

// Assume 1d
export let mergeKeys = (args) =>{
    let seen_keys = []
    let shared_keys = []

    for(let arg of args){
        for(let key of Object.keys(arg)){
            if(seen_keys.includes(key)){
                shared_keys.push(key)
            } else{
                seen_keys.push(key)
            }
        }
    }
    
    return [...new Set(shared_keys)]
}

export let compareDict = (arg1, arg2) =>{
    let equal = true;
    for(let key of Object.keys(arg1)){
        if(typeof(arg1[key]) == "object" && typeof(arg2[key]) == "object"){
            equal = equal && compareDict(arg1[key], arg2[key])
        } else if (arg1[key] != arg2[key]){
            equal = false
        }
    }

    return equal
}