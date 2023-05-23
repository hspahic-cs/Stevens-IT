// This data file should export all functions using the ES6 standard as shown in the lecture code
import { bands } from "../config/mongoCollections.js";
import * as helper from "../helpers.js"
import {ObjectId} from "mongodb"

const exportedMethods = {
  async create(
    bandId,
    title,
    releaseDate,
    tracks,
    rating
  ) {
    bandId = helper.checkString(bandId, "bandId", "create")
    if(!ObjectId.isValid(bandId)) throw "create: bandId is invalid id"
    title = helper.checkString(title, "title", "create")
    releaseDate = helper.checkString(releaseDate, "releaseDate", "create")
    if(!Array.isArray(releaseDate.match("(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/(19[0-9][0-9]|20[0-1][0-9]|202[0-3])"))) throw "create: releaseDate is not in MM/DD/YYYY format"
    tracks = helper.checkArray(tracks, "tracks", "create", "string")
    if(tracks.length < 3) throw "create: tracker contains less than 3 elements"
    rating = helper.checkNumber(rating, "rating", "create")
    if(rating < 0 || rating > 5) throw "create: rating is not within valid range. (0-5)"


    let newAlbum = {
      _id : new ObjectId(),
      title,
      releaseDate,
      tracks,
      rating
    }

    const bandCollection = await bands()
    const newBand = await bandCollection.findOne({"_id": new ObjectId(bandId)})

    if(!newBand) throw "create: band with bandId doesn't extist"
    newBand.albums.push(newAlbum)
    
    let average = 0

    for(let i = 0; i < newBand.albums.length; i++){
      average += newBand.albums[i].rating
    }

    newBand.overallRating = Number((average / newBand.albums.length).toFixed(1))

    const updatedBand = await bandCollection.findOneAndUpdate(
      {"_id": new ObjectId(bandId)},
      {$set: newBand},
      {returnDocument: 'after'})
    
    if(updatedBand.lastErrorObject === 0)
      throw [404, `Could not update the post with id ${id}`]

    updatedBand.value._id = updatedBand.value._id.toString()
    for(let i = 0; i < updatedBand.value.albums.length; i++){
      updatedBand.value.albums[i]._id = updatedBand.value.albums[i]._id.toString()
    }

    return updatedBand.value
  },

  async getAll(bandId){
    bandId = helper.checkString(bandId, "bandId", "getAll")
    if(!ObjectId.isValid(bandId)) throw "getAll: bandId is not a valid id"
    
    const bandCollection = await bands()
    const foundBand = await bandCollection.findOne({"_id": new ObjectId(bandId)})
    
    if(!foundBand) throw "getAll: no band exists with bandId"

    if(foundBand.albums.length === 0){
      return []
    } 

    for(let i = 0; i < foundBand.albums.length; i++){
      foundBand.albums[i]._id = foundBand.albums[i]._id.toString()
    }

    return foundBand.albums
  },

  async get(albumId){
    albumId = helper.checkString(albumId, "albumId", "getAll")
    if(!ObjectId.isValid(albumId)) throw "get: albumId is not a valid id"
    
    const bandCollection = await bands()
    let album = await bandCollection.findOne(
      // elemMatch will go throgh the array attribute and query each element
      {albums: {$elemMatch: {_id: new ObjectId(albumId)}}},
      {projection: {albums: {$elemMatch: {_id: new ObjectId(albumId)}}}}
    )

    if(!album) throw "get: could not find album with albumId"

    album.albums[0]._id = album.albums[0]._id.toString()
    return album.albums[0]
  },

  async remove(albumId) {
    albumId = helper.checkString(albumId, "albumId", "remove")
    if(!ObjectId.isValid(albumId)) throw "remove: albumId is not a valid id"

    const bandCollection = await bands()
    
    let foundBand = await bandCollection.findOne(
      {albums: {$elemMatch: {_id: new ObjectId(albumId)}}}
    )

    if(!foundBand) throw "remove: no album with albumId"
    let bandId = foundBand._id

    let average = 0
    let numAlbums = foundBand.albums.length

    for(let i = 0; i < numAlbums; i++){
      if(foundBand.albums[i]._id != albumId){
        average += foundBand.albums[i].rating
      }
    }

    if(numAlbums - 1 === 0){
      average = 0
    } else{
      average = Number((average / (numAlbums - 1)).toFixed(1))
    }
    
    let updatedBand = await bandCollection.findOneAndUpdate(
      {_id: bandId}, 
      {$pull: {albums: {_id: new ObjectId(albumId)}}},
      {returnDocument: "after"}
    )

    updatedBand = await bandCollection.findOneAndUpdate(
      {_id: bandId},
      {$set: {overallRating: average}},
      {returnDocument: "after"}
    )

    updatedBand.value._id = updatedBand.value._id.toString()
    for(let i = 0; i < numAlbums-1; i++){
      updatedBand.value.albums[i]._id = updatedBand.value.albums[i]._id.toString()
    }

    return updatedBand.value
  }
}

export default exportedMethods