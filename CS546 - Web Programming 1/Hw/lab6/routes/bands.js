// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!

import {Router} from 'express'
const router = Router()
import {bandData} from "../data/index.js"
import * as helper from "../helpers.js"
import { bands } from '../config/mongoCollections.js'

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    try{
      const bandCollection = await bands()
      let allBands = await bandCollection.find({}, {projection: {_id: 1, name: 1}}).toArray()
      allBands = allBands.map(elem => {
        elem._id = elem._id.toString()
        return elem
      })
      return res.json(allBands)
    } catch(e){
      return res.sendStatus(500).json({error: e})
    }
  })
  .post(async (req, res) => {
    //code here for POST
    const bandInfo = req.body
    if(!bandInfo || Object.keys(bandInfo).length === 0){
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'})
    }

    try{
      bandInfo.name = helper.checkString(bandInfo.name, "name", "post https:/")
      bandInfo.recordCompany = helper.checkString(bandInfo.recordCompany, "recordCompany", "post https:/")
      if(bandInfo.recordCompany.length === 0) throw "post https:/ : recordCompany is not valid array"
    } catch(e){return res.status(400).json({error: e})}
  
    try{
      bandInfo.website = helper.checkString(bandInfo.website, "website", "post https:/")
      if(!Array.isArray(bandInfo.website.match("http\:\/\/www\..{5,}\.com"))) throw "post https:/ : website is not in form ~ http://www.[site].com!"
    } catch(e){return res.status(400).json({error: e})}

    try{
      bandInfo.genre = helper.checkArray(bandInfo.genre, "genre", "post https:/", "string")
      if(bandInfo.genre.length === 0) throw "post https:/ : genre is not valid array"
      bandInfo.groupMembers = helper.checkArray(bandInfo.groupMembers, "groupMembers", "post https:/", "string")
    } catch(e){return res.status(400).json({error: e})}

    try{
      bandInfo.yearBandWasFormed = helper.checkNumber(bandInfo.yearBandWasFormed, "yearBandWasFormed", "post https:/")
      if(bandInfo.yearBandWasFormed < 1900 || bandInfo.yearBandWasFormed > 2023) throw "post https:/ : yearBandWasFormed is not a valid date"
    } catch(e){return res.status(400).json({error: e})}

    try{
      const newBand = await bandData.create(
        bandInfo.name,
        bandInfo.genre,
        bandInfo.website,
        bandInfo.recordCompany,
        bandInfo.groupMembers,
        bandInfo.yearBandWasFormed,
      )
      res.json(newBand)
    } catch(e){
      res.sendStatus(400).json({error: e})
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    //code here for GET
    try{
      req.params.id = helper.checkId(req.params.id, "id", "get https:/:id")
    } catch(e){
      return res.status(400).json({error: e})
    }

    try{
      let foundBand = await bandData.get(req.params.id)
      res .json(foundBand)
    } catch(e){
      res.status(404).json({error: e})
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try{
      req.params.id = helper.checkId(req.params.id, "id", "put https:/:bands")
    } catch(e) {
      return res.status(400).json({error: e})
    }

    try{
      bandData.remove(req.params.id)
      res.json({"bandId": req.params.id, "deleted": true})
    } catch(e){
      return res.status(404).json({error: e})
    }
  })
  .put(async (req, res) => {
    //code here for PUT
    const bandInfo = req.body
    if(!bandInfo.name || !bandInfo.genre || !bandInfo.website || !bandInfo.recordCompany || !bandInfo.groupMembers || !bandInfo.yearBandWasFormed){
      return res
        .status(404)
        .json({error: "Not all fields are provided in the request body"})
    }
    
    try {
      req.params.id = helper.checkId(req.params.id, "id", "put https:/:bands")
    } catch(e){
      res
        .status(400)
        .json({error: "Invalid id"})
    }

    try{
      bandInfo.name = helper.checkString(bandInfo.name, "name", "post https:/")
      bandInfo.recordCompany = helper.checkString(bandInfo.recordCompany, "recordCompany", "post https:/")
      if(bandInfo.recordCompany.length === 0) throw "post https:/ : recordCompany is not valid array"
    } catch(e){return res.status(400).json({error: e})}
  
    try{
      bandInfo.website = helper.checkString(bandInfo.website, "website", "post https:/")
      if(!Array.isArray(bandInfo.website.match("http\:\/\/www\..{5,}\.com"))) throw "post https:/ : website is not in form ~ http://www.[site].com!"
    } catch(e){return res.status(400).json({error: e})}

    try{
      bandInfo.genre = helper.checkArray(bandInfo.genre, "genre", "post https:/", "string")
      if(bandInfo.genre.length === 0) throw "post https:/ : genre is not valid array"
      bandInfo.groupMembers = helper.checkArray(bandInfo.groupMembers, "groupMembers", "post https:/", "string")
    } catch(e){return res.status(400).json({error: e})}

    try{
      bandInfo.yearBandWasFormed = helper.checkNumber(bandInfo.yearBandWasFormed, "yearBandWasFormed", "post https:/")
      if(bandInfo.yearBandWasFormed < 1900 || bandInfo.yearBandWasFormed > 2023) throw "post https:/ : yearBandWasFormed is not a valid date"
    } catch(e){return res.status(400).json({error: e})}
    
     try{
      const newBand = await bandData.update(
        req.params.id,
        bandInfo.name,
        bandInfo.genre,
        bandInfo.website,
        bandInfo.recordCompany,
        bandInfo.groupMembers,
        bandInfo.yearBandWasFormed
      )
      res.json(newBand)
    } catch(e){
      res.sendStatus(404).json({error: e})
    }

  });

export default router