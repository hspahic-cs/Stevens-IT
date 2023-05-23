/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

import { checkPalindrome, replaceWordWithCensor, checkUndefined, checkString, findIndex, includesString, findMinDifference} from "./helpers.js";

export let palindromes = (strings) => {     

      checkUndefined(strings, "strings")
      if(!Array.isArray(strings)) throw 'palindromes: strings is not an array!'
      if(strings.length == 0) throw 'palindromes: strings is an empty array!'
      if(!strings.every(x => typeof(x) === "string" && x.trim() != "" && x != undefined)) throw `palindomes: strings array contains a non-string value!`

      let palindromeDict = {}

      for (let string of strings){
            checkUndefined(string, "string")
            string = string.toLowerCase().trim()
            string = string.split("").filter(x => x.charCodeAt(0) >= 97 && x.charCodeAt(0) <= 122).join("")
            if(string === "") throw 'palindromes: strings contains a string of only non-alpha numeric characters!'
            palindromeDict[string] = checkPalindrome(string)     
      }

      return palindromeDict
};

export let censorWords = (string, badWordsList) => {
      checkUndefined(string, "string");
      if(string.trim() == "") throw "censorWords: string consists of empty spaces!"
      checkUndefined(badWordsList, "badWordsList")
      if(!Array.isArray(badWordsList)) throw "censorWords: badWordsList is not an array!"
      if(!badWordsList.every(x => typeof(x) == "string")) throw "censorWords: badWordsList contains non-string values!"
      if(!badWordsList.every(x => string.includes(x))) throw "censorWords: string does not include all bad words!"

      for (let badWord of badWordsList){
            string = string.replace(badWord, replaceWordWithCensor(badWord))
      }

      return string
};

export let distance = (string, word1, word2) => {
      
      checkString(string, "string", "distance")
      checkString(word1, "word1", "distance")
      checkString(word2, "word2", "distance")

      let containsNonANumerics = (string) => {return string.split("").every(x => x != "." && x != "!" && x != "?")} 
      if(!containsNonANumerics(string)) throw "distance: string contains nonAlphanumerics"
      if(!containsNonANumerics(word1)) throw "distance: word1 contains nonAlphanumerics"
      if(!containsNonANumerics(word2)) throw "distance: word2 contains nonAlphanumerics"

      word1 = word1.toLowerCase()
      word2 = word2.toLowerCase()
      string = string.toLowerCase()

      string = string.replace(',', '')

      if(string.split(" ").length < 2) throw "distance: string contains less than 2 words"
      if(word1 === word2) throw "distance: word1 is the same as word2"

      if(!includesString(string.split(" "), word1.split(" ")) || !includesString(string.split(" "), word2.split(" "))) throw "distance: string does not include word1 or word2"
      if(Math.min(findIndex(string.split(" "), word1.split(" "))) >= Math.max(findIndex(string.split(" "), word2.split(" ")))) throw "distance: word1 after word2 in string"

      let endOfWord1 = word1.split(" ")
      let endOfWord2 = word2.split(" ")
      string = string.split(" ")

      return findMinDifference(findIndex(string, endOfWord1), findIndex(string, endOfWord2)) - endOfWord1.length + 1
};
