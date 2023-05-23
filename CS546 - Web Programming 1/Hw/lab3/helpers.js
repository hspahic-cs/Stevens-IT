//Todo You can use this file for any helper functions you may need. This file is optional and you don't have to use it if you do not want to.

import axios from 'axios'

// INPUT HANDLING
export let checkStr = (input, var_name, func_name) => {
    if(!input) throw `${func_name}: (${var_name}) does not exist!`
    if(typeof input != "string") throw `${func_name}: (${var_name}) is not a string!`
    if(input.trim() === "") throw `${func_name}: (${var_name}) is an empty string!`

    return true
}

export let checkNum = (input, var_name, func_name) => {
    if(!input) throw `${func_name}: (${var_name}) does not exist!`
    if(typeof input != "number") throw `${func_name}: (${var_name}) is not a number!`
}


// MOVIE.JS HELPERS
export async function getMovies(){
    const {data} = await axios.get('https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json')
    return data
}

// USERS.JS HELPERS
export async function getUsers(){
    const {data} = await axios.get("https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json")
    return data
}