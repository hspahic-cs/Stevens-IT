// TODO: Export and implement the following functions in ES6 format
import * as help from "../helpers.js"
import {bands} from "../config/mongoCollections.js"
import {ObjectId} from 'mongodb'

export const create = async (
  name,
  genre,
  website,
  recordCompany,
  groupMembers,
  yearBandWasFormed
) => {
  name = help.checkString(name, "name", "create")
  genre = help.checkArray(genre, "genre", "create", "string")
  if(genre.length === 0) throw "create: genre cannot be an empty array!"
  website = help.checkString(website, "website", "create")
  if(!Array.isArray(website.match("http\:\/\/www\..{5,}\.com"))) throw "create: website is not in form ~ http://www.[site].com!"
  recordCompany = help.checkString(recordCompany, "recordCompany", "create")
  if(recordCompany.length === 0) throw "create: recordCompany cannot be an empty array!"
  groupMembers = help.checkArray(groupMembers, "groupMembers", "create", "string")
  yearBandWasFormed = help.checkNumber(yearBandWasFormed, "yearBandWasFormed", "create")
  if(yearBandWasFormed < 1900 || yearBandWasFormed > 2023) throw "create: yearBandWasFormed does not belong to (1900, 2023)!"

  let newBand = {
    name, 
    genre,
    website, 
    recordCompany,
    groupMembers,
    yearBandWasFormed
  }

  const bandCollection = await bands()
  const insertInfo = await bandCollection.insertOne(newBand)
  if(!insertInfo.acknowledged || !insertInfo.insertedId)
    throw 'create: could not add band!'

  const newId = insertInfo.insertedId.toString()
  const band = await get(newId)

  return band
};

export const getAll = async () => {
  const bandCollection = await bands()
  let bandList = await bandCollection.find({}).toArray()
  if(!bandList) throw "getAll: unable to get all bands!"

  // Potential issue here
  bandList = bandList.map(element => {
    element._id = element._id.toString() 
    return element})
  
  return bandList
};

export const get = async (id) => {
  id = help.checkString(id, "id", "get")
  if(!ObjectId.isValid(id)) throw "get: id invalid Object ID"
  
  const bandCollection = await bands()
  const band = await bandCollection.findOne({_id: new ObjectId(id)})
  if(band == null) throw 'get: no band with id!'
  band._id = band._id.toString()

  return band
};

export const remove = async (id) => {
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
};

export const rename = async (id, newName) => {
  id = help.checkString(id, "id", "rename")
  if(!ObjectId.isValid(id)) throw "rename: invalid Object id!"
  newName = help.checkString(newName, "newName", "rename")

  const updateBand = {
    name: newName
  }
  
  const bandCollection = await bands()
  const originalBand = await get(id)
  if(originalBand.name === newName) throw "rename: newName is same as original!"

  const updatedInfo = await bandCollection.findOneAndUpdate(
    {_id: new ObjectId(id)},
    {$set: updateBand},
    {returnDocument: 'after'}
  )
  
  if(updatedInfo.lastErrorObject.n === 0){
    throw "rename: unable to update band"
  }

  updatedInfo._id = updateInfo._id.toString()

  return updatedInfo.value
};
