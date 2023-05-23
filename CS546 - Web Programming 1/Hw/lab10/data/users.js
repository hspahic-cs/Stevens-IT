//import mongo collections, bcrypt and implement the following data functions
import helpers from "../helpers.js"
import {users} from "../config/mongoCollections.js"
import bcrypt from 'bcrypt'

const saltRounds = 16

export const createUser = async (
  firstName,
  lastName,
  emailAddress,
  password,
  role
  ) => {
  // Error checking
  const userCollection = await users()
  
  firstName = helpers.checkString(firstName, "firstName", "createUser")
  if(firstName.length <= 2 || firstName.length > 25) throw "createUser: 'firstName' must be 2-25 characters long!"

  lastName = helpers.checkString(lastName, "lastName", "createUser")
  if(lastName.length <= 2 || lastName.length > 25) throw "createUser: 'lastName' must be 2-25 characters long!"

  emailAddress = helpers.checkString(emailAddress, "emailAddress", "createUser")
  emailAddress = emailAddress.toLowerCase()
  emailAddress = helpers.checkEmailAddress(emailAddress, "emailAddress", "createUser")
  
  let foundEmail = await userCollection.findOne({emailAddress: emailAddress})
  if(foundEmail) throw "createUser: User already exists with this email address!"

  password = helpers.checkString(password, "password", "createUser")
  // Does the spaces condition count for a password like: "This My Password"
  if(password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) throw "createUser: 'password' does not satisfy all conditions!"

  role = helpers.checkString(role, "role", "createUser")
  role = role.toLowerCase()
  if(role != "admin" &&  role != "user") throw "createUser: 'role' must be either admin or user!"
  
  const hashedPswd = await bcrypt.hash(password, saltRounds)

  let newUser = {
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress,
    password: hashedPswd,
    role: role
  }
  
  const response = await userCollection.insertOne(newUser)
  if(response) return {insertedUser: true}
  else return {insertedUser: false}
};


export const checkUser = async (emailAddress, password) => {
  const userCollection = await users()

  // Error checking
  emailAddress = helpers.checkString(emailAddress, "emailAddress", "checkUser")
  emailAddress = emailAddress.toLowerCase()
  emailAddress = helpers.checkEmailAddress(emailAddress, "emailAddress", "checkUser")
  
  password = helpers.checkString(password, "password", "checkUser")
  if(password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) throw "createUser: 'password' does not satisfy all conditions!"
  
  const foundUser = await userCollection.findOne({emailAddress: emailAddress})
  if(!foundUser) throw "checkUser: User with this email address doesn't exist!"
 
  // const hash = await bcrypt.hash(password, saltRounds)
  // const hashedPswd = await bcrypt.hash(foundUser.password)
  const checkMatch = await bcrypt.compare(password, foundUser.password)
  let userInfo = undefined

  if (checkMatch) {
    userInfo = {
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      emailAddress: foundUser.emailAddress,
      role: foundUser.role
    }  
  } else throw "checkUser: either the email address or password are invalid"

  return userInfo
};
