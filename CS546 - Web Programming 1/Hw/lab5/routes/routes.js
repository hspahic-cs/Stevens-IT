//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

/*
import the router and create the follow routes using the GET http method

'/aboutme';
'/mystory';
'/educationhistory'




export the router */

import {Router} from 'express';
const router = Router();

router
    .route('/aboutme')
    .get(async (req, res) =>{
        try{
            const aboutme = {
                "firstName": "Harris",
                "lastName": "Spahic",
                "biography": "My name is Harris. I am a CS student, who lived in Jersey most their life.\n I went to highschool in Secaucus, and deeply enjoy mathematics. That will be all.",
                "favoriteMovies": ["Parasite", "American Beauty", "Rogue One: A Star Wars Story"],
                "hobbies": ["Reading", "Enjoying Theatre", "Analyzing Rap", "Cooking"],
                "fondestMemory": "Rafting down the Drina as a kid with my grandpa in Bosnia"
            }
            return res.json(aboutme)
            } catch(e) {
                return res.status(404).json(e)
            }
        })
    
router
    .route('/mystory')
    .get(async (req, res) =>{
        try{
            const mystory = {
                "storyTitle": "A Story about A Guy Named Harris",
                "storyGenre": "Philosophical",
                "story": 'This is the story of a man named Harris. Harris worked for a company in a big building where he was Employee #427. Employee #427\'s job was simple: he sat at his desk in Room 427 and he pushed buttons on a keyboard. Orders came to him through a monitor on his desk telling him what buttons to push, how long to push them, and in what order. This is what Employee #427 did every day of every month of every year, and although others may have considered it soul rending, Harris relished every moment that the orders came in, as though he had been made exactly for this job. And Harris was happy. \n And then one day, something very peculiar happened...' 
            } 
            return res.json(mystory)
        } catch(e) {
            return res.status(404).json(e)
        }
    })

router
    .route('/educationhistory')
    .get(async (req, res) =>{
        try{
            const educationhistory = [
                {
                    "schoolName": "Webster Elementary",
                    "degreeEarned": "N.A",
                    "numberYearsAttended": 3,
                    "favoriteClasses": ["Art"],
                    "favoriteSchoolMemory": "Going around collecting candy from every class on my birthday"
                },
                {
                    "schoolName": "Secaucus High School",
                    "degreeEarned": "H.S. Diploma",
                    "numberYearsAttended": 4,
                    "favoriteClasses": ["Honors Literature 1", "AP Chemistry", "AP Physics", "Calc 3"],
                    "favoriteSchoolMemory": "JSA school trip to Washington"
                },
                {
                    "schoolName": "City College Of New York",
                    "degreeEarned": "Audited",
                    "numberYearsAttended": 1,
                    "favoriteClasses": ["Linear Algebra for Engineers"],
                    "favoriteSchoolMemory": "Attending a lecture on Markov Chains from a researcher at google."
                }
            ]
            return res.json(educationhistory)
        } catch (e) {
            return res.status(404).json(e)
        }
    })

export default router