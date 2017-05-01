// This file is responsible for the success and failure functions of the API Calls
// Errors and success messages are written to the game log

'use strict'

const users = require('./users')

// This function runs on a successful sign up or sign-in
const signUpSuccess = (data) => {
  // Hide the modal after its use
  $('#signUpModal').modal('hide')
}

const signInSuccess = (data) => {
  users.user = data
  console.log(users.user)
  $('#signInModal').modal('hide')
}

// This function runs if there is a problem with sign up
const signUpFailure = () => {
  $('.debug').text('There was an issue with your signup')
}

// This function runs if there is a probelm with sign in
const signInFailure = () => {
  $('.sign_in_debug').text('There was a problem signing you in')
}

// This function runs if you sign out successfully
const signOutSuccess = () => {
  console.log('Success')
}

// This function runs if change passwords succeeds
const changePWSuccess = (data) => {
  $('#changePWModal').modal('hide')
  $('.game-log').text('Your password has successfully been changed')
}

// This function runs if change password fails
const changePWFailure = () => {
  $('#changePWModal').modal('hide')
  $('.game-log').text('There was an error - please try again')
  $('.changePWNav').modal('hide')
}

// Export these functions for use
module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  changePWSuccess,
  changePWFailure
}
