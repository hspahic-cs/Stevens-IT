/*
Require express and express router as shown in lecture code and worked in previous labs.
Your server this week should not be doing any of the processing! Your server only exists to allow someone to get to the HTML Page and download the associated assets to run the text analyzer page.

you just need one route to send the static homepage.html file
*/
import {Router} from 'express'
import {resolve} from 'path'
const router = Router()


router
    .route('/')
    .get(async (req, res) => {
    try{
        res.sendFile(resolve('static/homepage.html'))
    } catch(e){
        res.status(500).json({error:e})
    }
})

export default router;