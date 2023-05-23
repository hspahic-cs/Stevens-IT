//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//User data link: https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json
import {checkStr, checkNum, getUsers, getMovies} from "./helpers.js"

export const getUserById = async (id) => {
    checkStr(id, "id", "getUserById")
    id = id.trim()
    
    let data = await getUsers()
    // Remove any values incorreclty defined
    data = data.filter(user => Object.hasOwn(user, "id"))
    let user = data.find(user => user.id === id)

    if(!user) throw "user not found!"
    
    return user
};

export const sameGenre = async (genre) => {
    checkStr(genre, "genre", "sameGenre")
    genre = genre.toLowerCase().trim()

    let data = await getUsers()
    data = data.filter(user => Object.hasOwn(user, "favorite_genre") && typeof (user.favorite_genre) == "string" && 
    user.favorite_genre.trim() != "" && user.favorite_genre.split("|").map(str => str.toLowerCase()).includes(genre))

    let invalid_data = data.filter(user => checkStr(user.first_name, "first_name", "sameGenre") && checkStr(user.last_name, "last_name", "sameGenre"))
    data = data.map(user => user.first_name + " " + user.last_name)
    data = data.sort((x, y) => x.split(" ")[1] > y.split(" ")[1] ? 1 : -1)
    
    if (data.length < 2) throw "sameGenre: less than two people enjoy this genre"
    
    if (data.length > 50) return data.slice(0, 50)
    else return data
};

// TODO: Make sure all values read in from dictionary correct
export const moviesReviewed = async (id) => {
    checkStr(id, "id", "moviesReviewed")
    id = id.trim()

    let user = await getUserById(id)
    let data = await getMovies()
    let user_reviews = []

    user = user.username

    data = data.filter(movie => Object.hasOwn(movie, "reviews") && Array.isArray(movie.reviews) && 
    movie.reviews.find(review => review.username === user))

    for(let movie of data){
        let sub_data = movie.reviews
        for(let review of sub_data){
            if (review.username === user){
                let obj = {}
                obj[movie.title] = review
                user_reviews.push(obj)
            }
        }
    }

    return user_reviews
};

export const referMovies = async (id) => {
    checkStr(id, "id", "referMovies")
    id = id.trim()

    let user = await getUserById(id)
    let data = await getMovies()
    
    let search_genre = user.favorite_genre.toLowerCase()
    
    data = data.filter(movie => Object.hasOwn(movie, "title") && Object.hasOwn(movie, "genre") && typeof(movie.title) == "string" &&
    typeof(movie.genre) == "string" && movie.genre.split("|").map(x => x.toLowerCase()).includes(search_genre))

    let reviewed_movies = await moviesReviewed(id)
    reviewed_movies = reviewed_movies.map(movie => Object.keys(movie)).map(array => array[0])
    
    data = data.filter(movie => !reviewed_movies.includes(movie.title))

    return data.map(movie => movie.title)
};
