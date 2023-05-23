// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!

let loginForm = document.getElementById('login-form')
let regForm = document.getElementById('registration-form')

function checkString (input, var_name, func_name) {
    if(!input) throw `${func_name}: ${var_name} undefined!`
    if(typeof(input) != "string") throw `${func_name}: ${var_name} is not a string!`
    if(input.trim() === "") throw `${func_name}: ${var_name} is empty!`
    
    return input.trim()
}

function checkNumber (input, var_name, func_name) {
    if(!input) throw `${func_name}: ${var_name} undefined!`
    if(typeof(input) != "number") throw `${func_name}: ${var_name} is not a number!`
    
    return input
}

function checkArray (input, var_name, func_name, array_type = undefined) {
    if(!input) throw `${func_name}: ${var_name} undefined!`
    if(!Array.isArray(input)) throw `${func_name}: ${var_name} is not an array!`
    if(array_type){if(!input.every(element => typeof(element) === array_type)) throw `${func_name}: ${var_name} has elements of type ${array_type}!`}
    if(array_type === "string"){
    if(!input.every(element => element.trim() != "")){throw `${func_name}: ${var_name} contains empty strings!`}
    else{input = input.map(element => element.trim())}}

    return input
}

function checkEmailAddress(input, func_name){
    if(!input) throw `${func_name}: emailAddress undefined!`
    if(typeof(input) != "string") throw `${func_name}: emailAddress is not a string`
    input = input.toLowerCase()
    if(input.trim() === "") throw `${func_name}: emailAddress is an empty string`
    let regx = /[a-z|A-Z|0-9|_|\.|-]+@[a-z|A-Z|0-9|\-]+\.[a-z]{2,}/
    
    if(!regx.test(input)) throw `${func_name}: emailAddress is not a valid email address`
    return input.trim()
}

function checkPassword(input, func_name){
    if(!input) throw `${func_name}: password undefined!`
    if(typeof(input) != "string") throw `${func_name}: password is not a string`
    if(input.trim() === "") throw `${func_name}: password is an empty string`
    let special_char_regx = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
    
    if(input.length < 8 || !/[A-Z]/.test(input) || !/[0-9]/.test(input) || !special_char_regx.test(input)) throw `${func_name}: 'password' does not satisfy all conditions!`
    return input.trim()
}

if(loginForm){
    loginForm.addEventListener('submit', (event) =>{
        let email = document.getElementById('emailAddressInput')
        let pswd = document.getElementById('passwordInput')
        let error_msg = document.getElementById('login-form-error')
        if(email.value.trim() === ""){
            email.value = ''
            error_msg.hidden = false
            error_msg.innerHTML = "You must enter email!"
            event.preventDefault()
        } else if(pswd.value.trim() === ""){
            pswd.value = ''
            error_msg.hidden = false
            error_msg.innerHTML = "You must enter a password"
            event.preventDefault()
        } else if(email.value && pswd.value){
            try{
            email = checkEmailAddress(email.value, "")
            pswd = checkPassword(pswd.value, "")
            } catch (e){
                error_msg.hidden = false
                error_msg.innerHTML = e
                event.preventDefault()
            }
        } else {
            email.value = ''
            pswd.value = ''
            error_msg.hidden = false
            error_msg.innerHTML = 'All fields must be filled!'
            event.preventDefault()
        }
    })
}

else if(regForm){
    regForm.addEventListener('submit', (event) => {
        let firstName = document.getElementById("firstNameInput")
        let lastName = document.getElementById("lastNameInput")
        let email = document.getElementById("emailAddressInput")
        let pswd = document.getElementById("passwordInput")
        let confirm_pswd = document.getElementById("confirmPasswordInput")
        let role = document.getElementById("roleInput")
        let error_msg = document.getElementById('reg-form-error')
        if(firstName.value.trim() === ""){
            firstName.value = ''
            error_msg.hidden = false
            error_msg.innerHTML = "You must enter your first name!"
            event.preventDefault()
        } else if(lastName.value.trim() === ""){
            lastName.value = ''
            error_msg.hidden = false
            error_msg.innerHTML = "You must enter a last name!"
            event.preventDefault()
        } else if(email.value.trim() === ""){
            email.value = ''
            error_msg.hidden = false
            error_msg.innerHTML = "You must enter a email!"
            event.preventDefault()
        } else if(pswd.value.trim() === ""){
            pswd.value = ''
            error_msg.hidden = false
            error_msg.innerHTML = "You must enter a password"
            event.preventDefault()
        } else if(confirm_pswd.value.trim() === ""){
            confirm_pswd.value = ''
            error_msg.hidden = false
            error_msg.innerHTML = "You must enter a confirmation password!"
            event.preventDefault()
        } else if(firstName.value && lastName.value && email.value && pswd.value && confirm_pswd.value){
            try{
                firstName.value = checkString(firstName.value, "firstName", "")
                if(firstName.value.length <= 2 || firstName.value.length > 25) throw ": 'firstName' must be 2-25 characters long!"
                lastName.value = checkString(lastName.value, "lastName", "")
                if(lastName.value.length <= 2 || lastName.value.length > 25) throw ": 'lastName' must be 2-25 characters long!"
                email.value = checkEmailAddress(email.value, "")
                pswd.value = checkPassword(pswd.value, "")
                confirm_pswd.value = checkPassword(confirm_pswd.value, "")
                if(confirmPasswordInput.value != passwordInput.value) throw ": password does not match password confirmation!"
                role.value = checkString(role.value, "role", "")
                if(role.value != 'admin' && role.value != 'user') throw ": role must be admin or user!"
            } catch(e) {
                error_msg.hidden = false
                error_msg.innerHTML = e
                event.preventDefault()
            }
        } else {
            firstName.value = ''
            lastName.value = ''
            email.value = ''
            pswd.value = ''
            confirm_pswd.value = ''
            error_msg.hidden = false
            error_msg.innerHTML = 'All fields must be filled!'
            event.preventDefault()
        }
    })   
}