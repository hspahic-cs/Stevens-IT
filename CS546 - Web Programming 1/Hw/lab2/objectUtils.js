/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
import {compareDict, mergeKeys} from "./helpers.js"

export let areObjectsEqual = (...args) => {
      //this function takes in a variable number of objects that's what the ...args signifies
      if(args.length < 2) throw 'areObjectsEqual: less than two inputs provided'
      if(!args.every(x => x != null)) throw `areObjectsEqual: argument is null`
      if(!args.every(x => typeof(x) == "object" && Array.isArray(x) == false)) throw `areObjectsEqual: nonObject argument exists`
      
      let num_keys = Object.keys(args[0]).length
      if(!args.every(x => Object.keys(x).length == num_keys)) return false

      let result = true;
      for(let i = 0; i < args.length -1; i++){
            result = result && compareDict(args[i], args[i+1])
      }

      return result
};

export let calculateObject = (object, funcs) => {
      if(object == null) throw `calculateObject: object is null`
      if(typeof(object) != 'object') throw `calculateObject: object is not of type object`

      if(funcs == null) throw `calculateObject: funcs is null`
      if(!Array.isArray(funcs)) throw `calculateObject: funcs is not an array`

      if(!Object.values(object).every(x => typeof(x) == 'number')) throw `cacluateObject: object contains a value which is not a number`

      if(funcs.length < 1 || !funcs.every(x => typeof(x) == 'function')) throw `calculateObject: funcs has no elements or elements are not functions`

      for(let func of funcs){
            Object.keys(object).forEach(x => object[x] = func(object[x]))
      }

      for(let key of Object.keys(object)){
            object[key] = (object[key].toFixed(2))
      }

      return object
};

export let combineObjects = (...args) => {
      //this function takes in a variable number of objects that's what the ...args signifies
      if(!args.every(x => x != null)) throw `areObjectsEqual: argument is null`
      if(args.length < 2) throw "combineObjects: only 1 or less argument"
      if(!args.every(x => typeof(x) == "object" && Object.keys(x).length != 0 )) throw `arObjectsEqual: nonObject argument exists or empty`

      let result = {}
      let shared_keys = mergeKeys(args)

      for(let arg of args){
            for(let key of shared_keys){
                  if(Object.hasOwn(arg, key) && !Object.hasOwn(result, key)){
                        result[key] = arg[key]
                  }
            }
      }

      return result
};
