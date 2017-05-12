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
  console.log(data)
  $('#signInModal').modal('hide')
  $('.changePWNav').show()
  $('.signOut').show()
  $('.everything').show()
  $('.signUpNav').hide()
  $('.signInNav').hide()
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
  $('.changePWNav').hide()
  $('.signOut').hide()
  $('.everything').hide()
  $('.signUpNav').show()
  $('.signInNav').show()
  $('.show-songs').empty()
  $('.add_lyrics').empty()
  $('.add_translation').empty()
  $('.song_msg').empty()
  $('input:text').val('')
  $('input:password').val('')
}

const signOutFailure = () => {
}

// This function runs if change passwords succeeds
const changePWSuccess = (data) => {
  $('#changePWModal').modal('hide')
  $('#change-password-oldpw').val('')
  $('#change-password-newpw').val('')
}

// This function runs if change password fails
const changePWFailure = () => {
  $('.pw_debug').text('There was a problem changing your password')
  $('#change-password-oldpw').val('')
  $('#change-password-newpw').val('')
}

// Export these functions for use
module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  changePWSuccess,
  changePWFailure,
  signOutFailure
}
