// This file is responsible for the success and failure functions of the API Calls
// Errors and success messages are written to the game log

'use strict'

const players = require('./players')
const api = require('./api.js')

// This function runs on a successful sign up or sign-in
const signUpSuccess = (data) => {
  // Hide the modal after its use
  $('.signUpModal').modal('hide')

  // Check to see which player is signing in and greet that player
  if (players.player === undefined) {
    players.player = data.user
    $('.game-log').text('Welcome ' + players.player.email + '.  Please sign in to play')
  }
  // Sice someone is signed in, we need the sign out and change pw buttons to show
  $('.signOutNav').show()
  $('.changePWNav').show()
}

// This function runs if there is a problem with sign up
const signUpFailure = () => {
  $('.game-log').text('You are already signed up, or entered the wrong password, or you have not signed up yet')
}

// This function runs if there is a probelm with sign in
const signInFailure = () => {
  $('.game-log').text('You are already signed up, or entered the wrong password, or you have not signed up yet')
}

// This function runs if you sign out successfully
const signOutSuccess = () => {
  $('.game-log').text('You have signed out')
  players.player = undefined
  $('signOutNav').hide()
  $('.changePWNav').hide()
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
  signInFailure,
  signOutSuccess,
  changePWSuccess,
  changePWFailure
}
