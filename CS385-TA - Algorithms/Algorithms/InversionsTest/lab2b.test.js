const lab2b = require("./objUtils");

//DONE

let first = { x: 2, y: 3};
let second = { a: 70, x: 4, z: 5 };
let third = { x: 0, y: 9, q: 10 };
const err = 0;
const errob = {};

//makeArrays
console.log("makeArrays: [ ['x',2],['y',3], ['a',70], ['x', 4], ['z', 5], ['x',0], ['y',9], ['q',10] ] = " + lab2b.makeArrays([first, second, third]));
console.log("makeArrays: [ ['a',70], ['x', 4], ['z', 5], ['x',0], ['y',9], ['q',10] ] = " + lab2b.makeArrays([second, third]));
console.log("makeArrays: [  ['x',0], ['y',9], ['q',10], ['x',2],['y',3], ['a',70], ['x', 4], ['z', 5] ] = " + lab2b.makeArrays([third, first, second]));
//console.log("makeArrays: error = " + lab2b.makeArrays());
//console.log("makeArrays: error = " + lab2b.makeArrays(123));
//console.log("makeArrays: error = " + lab2b.makeArrays([]));
//console.log("makeArrays: error = " + lab2b.makeArrays([first, err]));
//console.log("makeArrays: error = " + lab2b.makeArrays([first, second, errob]));
//console.log("makeArrays: error = " + lab2b.makeArrays([first]));
first = {a: 2, b: 3};
second = {a: 2, b: 4};
third = {a: 2, b: 3};
let fourth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
let fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
console.log("isDeepEqual: false = " + lab2b.isDeepEqual(first, second));
console.log("isDeepEqual: true = " + lab2b.isDeepEqual(fourth, fifth));
console.log("isDeepEqual: false = " + lab2b.isDeepEqual(fourth, third));
console.log("isDeepEqual: true = " + lab2b.isDeepEqual(third, first));
console.log("isDeepEqual: true = " + lab2b.isDeepEqual({}, {}));
//console.log("isDeepEqual: error = " + lab2b.isDeepEqual([1,2,3], [1,2,3]));
console.log("isDeepEqual: error = " + lab2b.isDeepEqual("foo", {}));
//console.log("isDeepEqual: error = " + lab2b.isDeepEqual("foo", "bar"));

//computeObject
console.log("computeObject: {a: 6, b: 14, c: 10} = " + lab2b.computeObject({ a: 3, b: 7, c: 5 }, n => n * 2));
console.log("computeObject: {a: 2, b: 3, c: 4, d: 5} = " + lab2b.computeObject({ a: 1, b: 2, c: 3, d: 4 }, n => n + 1));
//console.log("computeObject: error = " + lab2b.computeObject("hey", n => n * 2));
//console.log("computeObject: error = " + lab2b.computeObject({a: 5}, "yo"));
//console.log("computeObject: error = " + lab2b.computeObject({a: 4, b: 3, c: "yo"}, n => n * 2));




