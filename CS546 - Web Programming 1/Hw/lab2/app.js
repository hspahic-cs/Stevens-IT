/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
import{sortAndFilter, merge, matrixMultiply} from "./arrayUtils.js";
import {palindromes, censorWords, distance} from "./stringUtils.js"
import {areObjectsEqual, calculateObject, combineObjects} from "./objectUtils.js";

    // // Testing for sortAndFilter
    let people = [ 
    {name: 'Ryan', age: '22', location: 'Hoboken', role: 'Student'}, 
    {name: 'Matt', age: '21', location: 'New York', role: 'Student'},
    {name: 'Matt', age: '25', location: 'New Jersey', role: 'Student'}, 
    {name: 'Greg', age: '22', location: 'New York', role: 'Student'}, 
    {name: 'Mike', age: '21', location: 'Chicago', role: 'Teacher'} ]; 
    
    console.log(sortAndFilter(people, ['name', 'asc'], ['location', 'asc'], 'role', 'Student')); 
    // console.log(sortAndFilter(people, ['name', 'asc'], ['location', 'desc'], 'role', 'Student')); 
    // console.log(sortAndFilter(people, ['location', 'asc'], ['name', 'asc'], 'age', '22'));     
    try{console.log(sortAndFilter(people, ['ssn', 'asc'], ['name', 'asc'], 'age', '22'));}
    catch(e){console.log(e)}
    // try{console.log(sortAndFilter(people, ['location', 'none'], ['name', 'asc'], 'age', '22'));}
    // catch(e){console.log(e)}
    // try{console.log(sortAndFilter(people, ['location', 'asc'], ['name', 'asc'], 'phone', '22'));}
    // catch(e){console.log(e)}
    // try{console.log(sortAndFilter(['location', 'asc'], ['name', 'asc'], 'age', '22'));}
    // catch(e){console.log(e)}
    // try{console.log(sortAndFilter(['string', {}], ['location', 'asc'], ['name', 'asc'], 'age', '22'));}
    // catch(e){console.log(e)}
    // try{console.log(sortAndFilter(people, ['location', 'asc'], ['name', 'asc'], 'age', 22));}
    // catch(e){console.log(e)}
    // try{console.log(sortAndFilter([ {name: 'Ryan', age: '22', location: 'Hoboken', role: 'Student'}, {name: 'Greg', age: 22, location: 'New York', role: 'Student'}], ['location', 'asc'], ['age', 'desc'], '22'));}
    // catch(e){console.log(e)}

    // // mergeArray Tests
    // console.log(unpackArray([1,2,[3,4,[5,6,7]]]))
    console.log(merge([3,0,"Lab2",2,"Aiden"], ["CS-546" ,"Computer Science",8,15], [6,3,"!Patrick",25,29]))
    try{console.log(merge([{"a":10}, 1, 2 , 3], ["a", "b", 10, 6]))} catch(e){console.log(e)}
    // console.log(merge(["bar", 0, 1, [[[5, "foo"]]]], [7, "buzz", ["fizz", 8]]))

    // // matrixMultiply Tests
    console.log(matrixMultiply([ [2,3], [3,4], [4,5] ], [ [1,1,1], [2,2,2] ], [ [3], [2], [1] ]))
    // console.log(matrixMultiply([ [3,5] ], [ [4], [4] ]))

    try{console.log(matrixMultiply([[]], [[]]))}
    catch(e){console.log(e)}
    // try{console.log(matrixMultiply([ [1,2]], [[3,3]]))}
    // catch(e){console.log(e)}
    // try{console.log(matrixMultiply([ [1,2], [3,3] ]))}
    // catch(e){console.log(e)}
    // try{console.log(matrixMultiply([ [1,2] ], [ ['foobar'], [6] ]))}
    // catch(e){console.log(e)}

    // // stringUtils Tests
    console.log(palindromes(["Madam", "Loot", "Was it a cat I saw?", "Poor Dan is in a droop", "Anna", "Nope" ]))
    console.log(palindromes([ "...A....", "CS-546 > 645+SC", "po,p,opop,po,p,op", "w", "not a/palindrome" ]))
    try{console.log(palindromes())}
    catch(e){console.log(e)}; // throws error
    // try{console.log(palindromes("hi"))}
    // catch(e){console.log(e)}; // throws error
    // try{console.log(palindromes("    "))}
    // catch(e){console.log(e)}; // throws error
    // try{console.log(palindromes(1))}
    // catch(e){console.log(e)}; // throws error
    // try{console.log(palindromes(["a", "b", 0]))}
    // catch(e){console.log(e)}

    // // censorWords Tests
    let badWords = ["bread","chocolate","pop"];
    console.log(censorWords("I like bread that has chocolate chips in it but I do not like lollipops", badWords))
    // console.log(censorWords("Is mayonnaise an instrument? Did you smell it? That smell. A kind of smelly smell. The smelly smell that smells...smelly.", ["strum", "smell", "mayo"]))
    // console.log(censorWords("This is bad, I cannot think of another good word for shoes!", ["bad", "word", "good", "shoes"]))
    try{console.log(censorWords("     ", badWords))}
    catch(e){console.log(e)}
    // try{console.log(censorWords("I like bread that has chocolate chips in it", [2, "wow"]))}
    // catch(e){console.log(e)}
    
    // distance Tests
    // console.log(distance("You must always trim your input strings, unless told not to", " trim ", "strings"))
    try{console.log(distance())}
    catch(e){console.log(e)} // throws error
    // try{console.log(distance([],true))}
    // catch(e){console.log(e)} // throws error
    // try{console.log(distance("","",""))}
    // catch(e){console.log(e)} // throws error
    // try{console.log(distance("Hello World!", "   !?!", "    ...  "))}
    // catch(e){console.log(e)} // throws error
    // try{console.log(distance(123, "CS", "Patrick"))}
    // catch(e){console.log(e)} // throws error
    // try{console.log(distance("Hello there", "hello", ""))}
    // catch(e){console.log(e)} // throws error
    // try{console.log(distance("Patrick", "Patrick", "Patrick"))}
    // catch(e){console.log(e)} // throws error
    // try{console.log(distance("Give me music suggestions", "rock", "pop"))}
    // catch(e){console.log(e)} // throws error
    // try{console.log(distance("Bob met Adam on wednesday", "Adam", "Bob"))}
    // catch(e){console.log(e)} // throws error
    // try{console.log(distance("I was going to buy preworkout powder yesterday", "going to", "workout powder"))}
    // catch(e){console.log(e)} // throws error
    // try{console.log(distance("Here is a word", "is", "is"))}
    // catch(e){console.log(e)}
    
    console.log(distance("The brown fox jumped over the lazy dog", "fox", "dog"))
    // console.log(distance("I was going to buy workout powder yesterday", "going to", "workout powder"))
    // console.log(distance("sphinx of black quartz, judge my vow", "QUARTZ", "vOW"))
    // console.log(distance("I really hope it will snow soon because I like snow", "I", "snow"))
    // console.log(distance("I like sweet and salty but I like sweet more", "salty", "sweet"))
    
    // calculateObject tests
    console.log(calculateObject({ a: 3, b: 7, c: 5 }, [(n => n * 2), (n => Math.sqrt(n))]));
    console.log(calculateObject([1, 2], [(n => n * 2)]))
    console.log(calculateObject({ a: 3, b: 7, c: 5 }, [(n => Math.pow(n * 2, 3)), (n => n + 546), (n => n / Math.PI)]))
    console.log(calculateObject({ a: 1, b: 2, c: 3, d: 4 }, [(n => { if (n % 2 == 0) { return n + 100 } else { return n - 100 } }), (n => n / 13)]))
    // /* Returns:
    // {
    // a: 2.45,
    // b: 3.74,
    // c: 3.16
    // }
    // */

    try{calculateObject({ a: 'Hello', b: 7, c: false }, [(n => n * n)]);}
    catch(e){console.log(e)}
    // /* Throws an error */

    // try{calculateObject({ a: 1, b: 2, c: 3}, [false]);}
    // catch(e){console.log(e)}
    // /* Throws an error */
    
    // combineObject Tests
    console.log(combineObjects(
        { a: 3, b: 7, c: 5 },
        { d: 4, e: 9 },
        { a: 8, d: 2 }
      ))
    //   /* Returns:
    //   {
    //     a: 3,
    //     d: 4
    //   }
    //   */
      
    // console.log(combineObjects(
    //     { b: 7, c: 5 },
    //     { d: 4, e: 9, a: 'waffle' },
    //     { a: 8, d: 2 },
    //     { d: 3, e: 'hello' }
    //   ))
    //   /* Returns:
    //   {
    //     a: 'waffle',
    //     d: 4,
    //     e: 9
    //   }
      
    //   combineObjects(
    //     { apple: 'orange', orange: 'pear' },
    //     { pear: 'blueberry', fruit: 4 },
    //     { cool: false, intelligence: -2 }
    //   );
    //   /* Returns:
    //   { }
    //   */

    try{console.log(combineObjects(
        { apple: 'orange', orange: 'pear' },
        { pear: 'blueberry', fruit: 4 },
        { cool: false, intelligence: -2 }
      ))} catch(e){console.log(e)}
      
    // try{combineObjects(
    //     { wow: 'crazy', super: 'duper' },
    //     false);} catch(e){console.log(e)}
    //   /* Throws an error */

    // areObjectsEqual Tests
    const first = {a: 2, b: 3};
    const second = {a: 2, b: 4};
    const third = {a: 2, b: 3};
    const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
    const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
    const sixth = {name: {firstName: "Patrick", lastName: "Hill"}, age: 47, dob: '9/25/1975', hobbies: ["Playing music", "Movies", "Spending time with family"]} 
    const seventh = {age: 47, name: {firstName: "Patrick", lastName: "Hill"}, hobbies: ["Playing music", "Movies", "Spending time with family"], dob: '9/25/1975'}
    const eighth = {b:3, a:2}
    console.log(areObjectsEqual(first, second, third)); // false
    // console.log(areObjectsEqual(forth, fifth)); // true
    // console.log(areObjectsEqual(forth, third, sixth)); // false
    // console.log(areObjectsEqual(sixth, seventh)); // true
    // console.log(areObjectsEqual(first, eighth, third)); // true
    // console.log(areObjectsEqual({}, {}, {}, {}, {})); // true
    try{console.log(areObjectsEqual([1,2,3], [1,2,3]));}catch(e){console.log(e)} // throws error 
    // try{console.log(areObjectsEqual("foo", "bar"));}catch(e){console.log(e)} // throws error