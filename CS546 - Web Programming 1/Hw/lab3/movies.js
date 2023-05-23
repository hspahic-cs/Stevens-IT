//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Movie data link: https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json
import { checkStr, checkNum, getMovies, getUsers } from "./helpers.js";
import { moviesReviewed } from "./users.js";

export const findMoviesByDirector = async (directorName) => {
    checkStr(directorName, "directorName", "findMoviesByDirector")
    directorName = directorName.trim()

    let data = await getMovies()
    data = data.filter(movie => Object.hasOwn(movie, "director") && typeof(movie.director) == "string" && movie.director.toLowerCase() === directorName.toLowerCase())
    
    console.log(data.length)
    if(data.length == 0) throw "findMoviesByDirector: no (director) found in movies dataset"
    return data
};

export const findMoviesByCastMember = async (castMemberName) => {
    checkStr(castMemberName, "castMemberName", "findMoviesByCastMember")
    castMemberName = castMemberName.trim()

    let data = await getMovies()
    data = data.filter(movie => Object.hasOwn(movie, "cast") && Array.isArray(movie.cast) && 
    movie.cast.every(element => typeof(element) == "string") && movie.cast.includes(castMemberName))
    
    console.log(data)
    if(data.length == 0) throw "findMoviesByCastMember: no movies with (castMemberName) found in movies dataset"
    return data
};

export const getOverallRating = async (title) => {
    checkStr(title, "title", "getOverallRating")
    title = title.trim()

    let data = await getMovies()
    data = data.filter(movie => Object.hasOwn(movie, "title") && Object.hasOwn(movie, "reviews") && typeof(movie.title) == "string" && 
    Array.isArray(movie.reviews) && movie.reviews.every(element => Object.hasOwn(element, "rating") && typeof(element.rating) == "number") &&
    movie.title === title)

    if(data.length == 0) throw "getOverallRating: (title) does not exist in movie database"

    data = data[0]
    data = data.reviews.map(review => review.rating)

    return Math.floor(10 * data.reduce((acc, cur) => acc + cur, 0) / data.length) / 10
};

export const getMovieById = async (id) => {
    checkStr(id, "id", "getMoviesByID")
    id = id.trim()

    let data = await getMovies()
    data = data.filter(movie => Object.hasOwn(movie, "id") && typeof(movie.id) == "string" && movie.id === id)

    if(data.length == 0) throw "getMovieById: (id) does not exist in movie database"
    if(data.length > 1) throw "getMovieById: (id) refers to multiple movies in database"

    return data[0]
};
