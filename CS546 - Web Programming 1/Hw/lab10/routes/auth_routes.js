//import express, express router as shown in lecture code

import {Router} from 'express'
import helpers from '../helpers.js'
import * as user from '../data/users.js'
const router = Router()

const rootMiddleware = async (req, res, next) => {
    if(req.session.user && req.session.user.roleInput == 'admin'){
        return res.redirect('/admin')
    } else if(req.session.user && req.session.user.roleInput == 'user'){
        return res.redirect('/protected')
    } else {
        return res.redirect('/login')
    }
}

router.route('/').get(rootMiddleware, async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({error: 'YOU SHOULD NOT BE HERE!'});
});

router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
    try{
      res.render('register', {})
    } catch(e){
      res.render('error', {Error: e})
    }
  })
  .post(async (req, res) => {
    try{
      let content = req.body
      content.firstNameInput = helpers.checkString(content.firstNameInput, "firstNameInput", "post:register")
      if(content.firstNameInput.length <= 2 || content.firstNameInput.length > 25) throw "post:register: 'firstName' must be 2-25 characters long!"
      content.lastNameInput = helpers.checkString(content.lastNameInput, "lastNameInput", "post:register")
      if(content.lastNameInput.length <= 2 || content.lastNameInput.length > 25) throw "post:register: 'lastName' must be 2-25 characters long!"
      content.emailAddressInput = helpers.checkEmailAddress(content.emailAddressInput, "post:register")
      content.passwordInput = helpers.checkPassword(content.passwordInput, "post:register")
      content.confirmPasswordInput = helpers.checkPassword(content.confirmPasswordInput, "post:register")
      if(content.confirmPasswordInput != content.passwordInput) throw "post:register: password does not match password confirmation!"
      content.roleInput = helpers.checkString(content.roleInput, "role", "post:register")
      if(content.roleInput != 'admin' && content.roleInput != 'user') throw "post:register: role must be admin or user!"

      const newUser = await user.createUser(content.firstNameInput, content.lastNameInput, content.emailAddressInput, content.passwordInput, content.roleInput)
      if(!newUser.insertedUser){
        res.status(500).render('error', {Error: 'Internal Server Error'})
      }
      res.render('login', {})

    } catch(e){
      res.status(400).render('register', {Error: e})
    }
  });

router
  .route('/login')
  .get(async (req, res) => {
    //code here for GET
    try{
      res.render('login', {})
    } catch(e){
      res.render('error', {Error:e})
    }
  })
  .post(async (req, res) => {
    try{
      let content = req.body
      content.emailAddressInput = helpers.checkEmailAddress(content.emailAddressInput, "post:register")
      content.passwordInput = helpers.checkPassword(content.passwordInput, "post:register")
      
      const loginUser = await user.checkUser(content.emailAddressInput, content.passwordInput)
      if(!loginUser) throw 'post:register: Invalid username or password!'
      
      req.session['user'] = loginUser

      if(loginUser.role === "admin"){
        return res.redirect('/admin')
      } else{
        return res.redirect('/protected')
      }

    } catch(e){
      res.status(400).render('login', {Error: e})
    }
  });

router.route('/protected').get(async (req, res) => {
  try{
    if(req.session.user){
      const date = new Date()
      res.render('protected', {firstName: req.session.user.firstName, 
                               currentTime: "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "]",
                               adminRole: req.session.user.role === 'admin',
                               role: req.session.user.role})
    }
  } catch(e){
    res.render(error, {Error:e})
  }
});

router.route('/admin').get(async (req, res) => {
  //code here for GET
  try{
    if(req.session.user){
      const date = new Date()
      res.render('admin', {firstName: req.session.user.firstName, 
                           currentTime: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()})
    }
  } catch(e){
    res.render(error, {Error:e})
  }
});

router.route('/error').get(async (req, res) => {
  try{
    res.render('error')
  } catch(e){
    res.render('error', {Error: e})
  }
});

router.route('/logout').get(async (req, res) => {
  try{
    req.session.destroy()
    res.render('logout')
  } catch (e){
    res.status(400).render(error, {Error: e})
  }
});

export default router;