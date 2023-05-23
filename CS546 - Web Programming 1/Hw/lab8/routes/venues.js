//Import express and express router as shown in lecture code and worked in previous labs
//You can make your axios calls to the API directly in the routes
import {Router} from 'express'
import helper from '../helpers.js'
const router = Router()
import axios from 'axios'
const API_KEY = "5qDJlm59TcmTNwyjApFWlWCvgL5f5qV5"
const API_LINK = "https://app.ticketmaster.com/discovery/v2/venues"



router.route('/').get(async (req, res) => {
  //code here for GET
  try{
    res.render('homepage', {layout:'main', pageTitle:'Venue Finder'})
  } catch(e){
    res.status(500).json({error:e})
  }
});

router.route('/searchvenues').post(async (req, res) => {
  //code here for POST
  try{
      const searchVenueTerm = helper.checkString(req.body.searchVenueTerm, "searchVenueTerm");
      let searchResults = await axios.get(`${API_LINK}?keyword=${searchVenueTerm}&apikey=${API_KEY}&countryCode=US&size=10`)

      if('_embedded' in searchResults.data){
        res.render('venueSearchResults', {venues:searchResults.data._embedded.venues, searchVenueTerm:searchVenueTerm, pageTitle:"Venue Finder"})}
      else{
        res.render('venueSearchResults', {venues:null, searchVenueTerm:searchVenueTerm, pageTitle:"Venue Finder"})
      }

    } catch(e){
      res.status(400).render('error', {error_msg:e, pageTitle:"Error"})
  }
  
});

router.route('/venuedetails/:id').get(async (req, res) => {
  try{
    const formData = req.params.id
    let searchResults = await axios.get(`${API_LINK}/${formData}?&apikey=${API_KEY}&countryCode=US&size=10`)
    
    let data = searchResults.data
    let image_url = ""
    
    if(!("name" in data)){
      data["name"] = "N/A"
    }

    if(!("address" in data)){
      data["address"] = {}
    } 
    if(!("line1" in data.address)){
      data.address["line1"] = "N/A"
    }

    if(!("city" in data)){
      data["city"] = {}
    }
    if(!("name" in data.city)){
      data.city["name"] = "N/A"
    }

    if(!("state" in data)){
      data["state"] = {}
    }
    if(!("stateCode" in data.state)){
      data.city["stateCode"] = "N/A"
    }

    if(!("postalCode" in data)){
      data["postalCode"] = "N/A"
    }

    if(!("boxOfficeInfo" in data)){
      data["boxOfficeInfo"] = {}
    } 
    if(!("phoneNumberDetail" in data.boxOfficeInfo)){
      data.boxOfficeInfo["phoneNumberDetail"] = "N/A"
    }

    if(!("images" in data) || data.images.length == 0){
      image_url = "/public/images/No_Image_Available.jpg"
    }else{
      image_url = searchResults.data.images[0].url
    }

    res.render('venueByID', {venue:data, venue_img:image_url, pageTitle:"Venue Details"})
  } catch(e){
    res.status(404).render('error', {error_msg:"a venue with that id does not exist", pageTitle:"Error"})
  }
});

export default router