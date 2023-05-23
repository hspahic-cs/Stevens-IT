// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!

import {Router} from 'express'
const router = Router()
import * as helper from "../helpers.js"
import {albumData} from "../data/index.js"


router
  .route('/:bandId')
  .get(async (req, res) => {
    //code here for GET
    try{
      req.params.bandId = helper.checkId(req.params.bandId, "bandId", "get https:/:bandId")
    } catch(e){
      return res
        .status(400)
        .json({error: e})
    }

    try{
      let allAlbums = await albumData.getAll(req.params.bandId)
      if(allAlbums.length === 0) throw "get https:/:bandId : No albums for particular band"
      res.json(allAlbums)
    } catch(e){
      res.status(404).json({error: e})
    }

  })
  .post(async (req, res) => {
    //code here for POST
    const albumList = req.body
    if(!albumList.title || !albumList.releaseDate || !albumList.tracks || !albumList.rating){
      return res
        .status(400)
        .json({error: "not all fields provided"})
    }

    try{
      req.params.bandId = helper.checkId(req.params.bandId, "bandId", "post https:/:bandId")
    } catch(e){
      res
        .status(400)
        .json({error: e})
    }

    try{
      albumList.title = helper.checkString(albumList.title, "title", "post https:/:bandId")
      albumList.releaseDate = helper.checkString(albumList.releaseDate, "releaseDate", "post https:/:bandId")
    } catch(e){
      res.status(400).json({error: e})
    }

    try{
      albumList.tracks = helper.checkArray(albumList.tracks, "tracks", "create", "string")
      if(albumList.tracks.length < 3) throw "create: tracker contains less than 3 elements"
    } catch(e){
      res.status(400).json({error: e})
    }

    try{
      albumList.releaseDate = helper.checkString(albumList.releaseDate, "releaseDate", "create")
      if(!Array.isArray(albumList.releaseDate.match("(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/(19[0-9][0-9]|20[0-1][0-9]|202[0-3])"))) throw "create: releaseDate is not in MM/DD/YYYY format"
    } catch(e){
      res.status(400).json({error:e})
    }

    try{
      albumList.rating = helper.checkNumber(albumList.rating, "rating", "create")
      if(albumList.rating < 0 || albumList.rating > 5) throw "create: rating is not within valid range. (0-5)"
    } catch(e){
      res.status(400).json({error:e})
    }

    try{
      let updatedBand = await albumData.create(req.params.bandId, albumList.title, albumList.releaseDate, albumList.tracks, albumList.rating)
      res.json(updatedBand)
    } catch(e){
      res.status(404).json({error: e})
    }
  });

router
  .route('/album/:albumId')
  .get(async (req, res) => {
    //code here for GET
    try{
      req.params.albumId = helper.checkId(req.params.albumId, "albumId", "post https:/album/:albumId")
    } catch(e){
      res
        .status(400)
        .json({error: e})
    }

    try{
      let foundAlbum = await albumData.get(req.params.albumId)
      res.json(foundAlbum)
    } catch(e){
      res.status(404).json({error: e})
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try{
      req.params.albumId = helper.checkId(req.params.albumId, "albumId", "post https:/album/:albumId")
    } catch(e){
      res
        .status(400)
        .json({error: e})
    }

    try{
      let removedAlbum = await albumData.remove(req.params.albumId)
      res.json({"albumId": req.params.albumId, "deleted":true})
    } catch(e){
      res.status(404).json({error: e})
    }
  });

export default router