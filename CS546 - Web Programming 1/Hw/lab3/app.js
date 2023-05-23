/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need an async function in your app.js file that awaits the calls to your function like the example below. You put all of your function calls within main each in its own try/catch block. and then you just call main().
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.

import * as movies from "./movies.js");

async function main(){
    try{
        const moviedata = await movies.getMovies();
        console.log (movieata);
    }catch(e){
        console.log (e);
    }
}

call main
main();
*/

import * as movies from "./movies.js"
import * as users from "./users.js"
import {getUsers} from "./helpers.js";

async function test_users(){
    // Testing getUserById
    try{
        let user = await users.getUserById("48fded55-37cd-4e6b-8f19-e78b481a14a4");
        console.log(user) // Returns {id:"48fded55-37cd-4e6b-8f19-e78b481a14a4",username:"abrett0",password:"YQ8Jpot33Mf",first_name:"Abigail",last_name:"Brett",email:"abrett0@gizmodo.com",favorite_genre:"Fantasy"}
    } catch (e) {console.log(e)}

    try{
        await users.getUserById(-1); // Throws Error
    } catch (e) {console.log(e)}

    try{
       await users.getUserById(1001); // Throws Error
    } catch (e) {console.log(e)}

    try{
        await users.getUserById(); // Throws Error
    } catch (e) {console.log(e)}

    try{
        await users.getUserById('7989fa5e-5617-43f7-a931-46036f9dbcff');// Throws user not found Error
    } catch (e) {console.log(e)}

    // Testing sameGenre
    try {
        let shared_genres = await users.sameGenre("Action")
        console.log(shared_genres)
    } catch (e){console.log(e)}

    try{
        let shared_genres = await users.sameGenre("Comedy")
        console.log(shared_genres)
    } catch(e){console.log(e)}

    try{
        await users.sameGenre()
    } catch (e) {console.log(e)}

    try{
        await users.sameGenre("IMAX")
    } catch (e) {console.log(e)}

    try{
        await users.sameGenre(123)
    } catch (e) {console.log(e)}

    try{
        await users.sameGenre(["Action"])
    } catch (e) {console.log(e)}

    try{
        await users.sameGenre(true)
    } catch (e) {console.log(e)} 


    // Testing moviesReviewed
    try{
        let movie_reviews = await users.moviesReviewed('64035fad-a5b7-48c9-9317-3e31e22fe26c')
        console.log(movie_reviews)
    } catch (e) {console.log(e)}    

    try{
        let movies_reviewed = await users.moviesReviewed("  b3f8c1e9-4f2a-4557-becc-272d8c2fdca4  ")
        console.log(movies_reviewed)
    } catch(e) {console.log(e)}

    try{
        await users.moviesReviewed(-1) // Throws Error
    } catch (e) {console.log(e)}

    try{
        await users.moviesReviewed(1001) // Throws Error
    } catch (e) {console.log(e)}

    try{
        await users.moviesReviewed() // Throws Error
    } catch (e) {console.log(e)}

    // Testing referMovies
    try{
        let movie_referals = await users.referMovies('5060fc9e-10c7-4f38-9f3d-47b7f477568b') // Throws user not found error
        console.log(movie_referals)
    } catch (e) {console.log(e)}

    try{
        let movie_referals = await users.referMovies("dec84e0f-ede4-46de-8924-6699bd766b35")
        console.log(movie_referals)
        console.log(movie_referals.length)
    } catch (e) {console.log(e)}

    try{
        await users.referMovies(-1) // Throws Error
    } catch (e) {console.log(e)}
    
    try{
        await users.referMovies('       '); // Throws Error
    } catch (e) {console.log(e)}

    try{
        await users.referMovies(); // Throws Error
    } catch (e) {console.log(e)}

    try{
        await users.referMovies('7989fa5e-5617-43f7-a931-46036f9dbcff');// Throws Error
    } catch (e) {console.log(e)}

}

async function test_movies(){
    // Testing findMoviesByDirector
    try{
        let directed_movies = await movies.findMoviesByDirector("Fernando DOLLIMORE")
        console.log(directed_movies)
    } catch(e) {console.log(e)}

    // Testing findMoviesByCastMember
    try{
        let directed_movies = await movies.findMoviesByCastMember("Huberto Snooden")
        console.log(directed_movies)
    } catch (e) {console.log(e)}

    // Testing getOverallRating
    try{
        let overallRating = await movies.getOverallRating('Asterix and the Vikings (Astérix et les Vikings)')
        console.log(overallRating)
    } catch(e) {console.log(e)}

    try{
        await movies.getOverallRating(43) // Throws Error
    } catch (e) {console.log(e)}
    
    try{
        await movies.getOverallRating(' ') // Throws Error
    } catch (e) {console.log(e)}

    try{
        await movies.getOverallRating('Mamma Mia') // Throws Error
    } catch (e) {console.log(e)}

    try{
        await movies.getOverallRating() // Throws Error
    } catch (e) {console.log(e)}

    // Testing getMovieById
    try{
        let movie = await movies.getMovieById("38fd6885-0271-4650-8afd-6d09f3a890a2")
        console.log(movie)
    } catch(e) {console.log(e)}

    try{
        await movies.getMovieById(-1)
    } catch(e) {console.log(e)}

    try{
        await movies.getMovieById(1001)
    } catch(e) {console.log(e)}

    try{
        await movies.getMovieById()
    } catch(e) {console.log(e)}

    try{
        await movies.getMovieById('  7989fa5e-5617-43f7-a931-46036f9dbcff  ')
    } catch(e) {console.log(e)}
}

test_movies()
