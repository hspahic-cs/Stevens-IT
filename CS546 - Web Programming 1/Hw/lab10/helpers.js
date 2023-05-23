//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
// You can add and export any helper functions you want here - if you aren't using any, then you can just leave this file as is

const exportedMethods = {
    checkString (input, var_name, func_name) {
        if(!input) throw `${func_name}: ${var_name} undefined!`
        if(typeof(input) != "string") throw `${func_name}: ${var_name} is not a string!`
        if(input.trim() === "") throw `${func_name}: ${var_name} is empty!`
        
        return input.trim()
    },
    checkNumber (input, var_name, func_name) {
        if(!input) throw `${func_name}: ${var_name} undefined!`
        if(typeof(input) != "number") throw `${func_name}: ${var_name} is not a number!`
        
        return input
    },
    checkArray (input, var_name, func_name, array_type = undefined) {
        if(!input) throw `${func_name}: ${var_name} undefined!`
        if(!Array.isArray(input)) throw `${func_name}: ${var_name} is not an array!`
        if(array_type){if(!input.every(element => typeof(element) === array_type)) throw `${func_name}: ${var_name} has elements of type ${array_type}!`}
        if(array_type === "string"){
        if(!input.every(element => element.trim() != "")){throw `${func_name}: ${var_name} contains empty strings!`}
        else{input = input.map(element => element.trim())}}

        return input
    },
    checkEmailAddress(input, func_name){
        if(!input) throw `${func_name}: emailAddress undefined!`
        if(typeof(input) != "string") throw `${func_name}: emailAddress is not a string`
        input = input.toLocaleLowerCase()
        if(input.trim() === "") throw `${func_name}: emailAddress is an empty string`
        let regx = /[a-z|A-Z|0-9|_|\.|-]+@[a-z|A-Z|0-9|\-]+\.[a-z]{2,}/
        
        if(!regx.test(input)) throw `${func_name}: emailAddress is not a valid email address`
        return input.trim() 
    }, 
    checkPassword(input, func_name){
        if(!input) throw `${func_name}: password undefined!`
        if(typeof(input) != "string") throw `${func_name}: password is not a string`
        if(input.trim() === "") throw `${func_name}: password is an empty string`
        let special_char_regx = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
        
        if(input.length < 8 || !/[A-Z]/.test(input) || !/[0-9]/.test(input) || !special_char_regx.test(input)) throw `${func_name}: 'password' does not satisfy all conditions!`
        return input.trim()
    }
}

export default exportedMethods