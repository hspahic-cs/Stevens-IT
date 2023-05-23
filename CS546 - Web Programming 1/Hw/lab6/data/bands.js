// This data file should export all functions using the ES6 standard as shown in the lecture code

import { bands } from "../config/mongoCollections.js";
import * as help from "../helpers.js"
import {ObjectId} from "mongodb"

const exportedMethods = {
  async create (
    name,
    genre,
    website,
    recordCompany,
    groupMembers,
    yearBandWasFormed
  ) {
    name = help.checkString(name, "name", "create")
    genre = help.checkArray(genre, "genre", "create", "string")
    if(genre.length === 0) throw "create: genre cannot be an empty array!"
    website = help.checkString(website, "website", "create")
    if(!Array.isArray(website.match("http\:\/\/www\..{5,}\.com"))) throw "create: website is not in form ~ http://www.[site].com!"
    recordCompany = help.checkString(recordCompany, "recordCompany", "create")
    if(recordCompany.length === 0) throw "post https:/ : recordCompany is not valid array"
    groupMembers = help.checkArray(groupMembers, "groupMembers", "create", "string")
    if(groupMembers.length === 0) throw "create: groupMembers missing members"
    yearBandWasFormed = help.checkNumber(yearBandWasFormed, "yearBandWasFormed", "create")
    if(yearBandWasFormed < 1900 || yearBandWasFormed > 2023) throw "create: yearBandWasFormed does not belong to (1900, 2023)!"

    let albums = []
    let overallRating = 0

    let newBand = {
      name, 
      genre,
      website, 
      recordCompany,
      groupMembers,
      yearBandWasFormed,
      albums,
      overallRating
    }

    const bandCollection = await bands()
    const insertInfo = await bandCollection.insertOne(newBand)
    if(!insertInfo.acknowledged || !insertInfo.insertedId)
      throw 'create: could not add band!'

    const newId = insertInfo.insertedId.toString()  
    const band = await this.get(newId)

    return band
  },

  async getAll (){
    const bandCollection = await bands()
    let bandList = await bandCollection.find({}).toArray()
    if(!bandList) throw "getAll: unable to get all bands!"

    // Potential issue here
    bandList = bandList.map(element => {
      element._id = element._id.toString() 
      return element})
    
    return bandList
  },

  async get(id){
    id = help.checkString(id, "id", "get")
    if(!ObjectId.isValid(id)) throw "get: id invalid Object ID"
    
    const bandCollection = await bands()
    const band = await bandCollection.findOne({_id: new ObjectId(id)})
    if(band == null) throw 'get: no band with id!'
    band._id = band._id.toString()

    return band
  },

  async remove (id) {
    id = help.checkString(id, "id", "remove")
    if(!ObjectId.isValid(id)) throw "remove: invalid Object id!"

    const bandCollection = await bands()
    const deletionInfo = await bandCollection.findOneAndDelete({
      _id: new ObjectId(id)
    })

    if(deletionInfo.lastErrorObject.n === 0){
      throw `remove: could not delete band with id of ${id}`
    }

    return `${deletionInfo.value.name} has been successfully deleted!`
  },

  async update (
    id,
    name,
    genre,
    website,
    recordCompany,
    groupMembers,
    yearBandWasFormed
  ) {
    id = help.checkString(id, "id", "update")
    if(!ObjectId.isValid(id)) throw "update: ObjectId is not valid!"
    name = help.checkString(name, "name", "update")
    genre = help.checkArray(genre, "genre", "update", "string")
    if(genre.length === 0) throw "update: genre is not valid array"
    if(!Array.isArray(website.match("http\:\/\/www\..{5,}\.com"))) throw "update: website is not in form ~ http://www.[site].com!"
    website = help.checkString(website, "website", "update")
    recordCompany = help.checkString(recordCompany, "recordCompany", "update")
    if(recordCompany.length === 0) throw "update: recordCompany is not valid array"
    groupMembers = help.checkArray(groupMembers, "groupMembers", "update", "string")
    if(groupMembers.length === 0) throw "update: groupMembers missing members"
    yearBandWasFormed = help.checkNumber(yearBandWasFormed, "yearBandWasFormed", "update")
    if(yearBandWasFormed < 1900 || yearBandWasFormed > 2023) throw "update: yearBandWasFormed is not a valid date"
    
    let updatedBand = {
      name, 
      genre,
      website, 
      recordCompany,
      groupMembers,
      yearBandWasFormed
    }

    const bandCollection = await bands()
    let newBand = await bandCollection.findOneAndUpdate(
      {"_id": new ObjectId(id)}, 
      {"$set": updatedBand},
      {returnDocument: 'after'})
    
    if(newBand.lastErrorObject === 0)
      throw [404, `Could not update the post with id ${id}`]

    if(!newBand.value)
      throw "update: could not find id"

    let result = newBand.value
    result._id = result._id.toString()
    
    return result
  }
}

export default exportedMethods