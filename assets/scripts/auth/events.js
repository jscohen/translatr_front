'use strict'

// Getting required files.  getFormFields is used to get data from forms
const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')
const players = require('./players')

// Sign Up function
// Takes data from a modal, accessed via getFormFields
// The event has preventDefault which stops the page from refreshing
// Then the API is called with the form data, executing a success function
// if it works, and a failure function if there is an error
const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.signUp(data).then(ui.signUpSuccess)
  .catch(ui.signUpFailure)
}

// Sign in function
// See comments for Sign Up Function
const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.signIn(data).then(ui.signUpSuccess)
  .catch(ui.signInFailure)
}

// Sing Out FUnction
// Takes input from the sign out button on the homepage
// Returns a log message and aborts if no one is signed in
// Calls API to Delete the user
const onSignOut = function (event) {
  event.preventDefault()
  if (players.player1 === undefined) {
    $('.game-log').text('No one is signed in')
    return false
  }
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

// Change Password function
// Get password data from the modal
// Assigns player ID and token to a variable depending on who is changing the PW
// Calls the ChangePW function in the API with a PATCH to enter in the new PW
const onChangePW = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  let playerID = 0
  let playerToken = ''
  if (players.player2 === undefined) {
    playerID = players.player1.id
    playerToken = players.player1.token
  } else {
    playerID = players.player2.id
    playerToken = players.player2.token
  }
  api.changePW(data, playerID, playerToken).then(ui.changePWSuccess)
  .catch(ui.changePWFailure)
}

// Click handlers get input from the html elements when they are clicked
const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
  $('#change-password').on('submit', onChangePW)
}

// Exports for use in main index file
module.exports = {
  addHandlers
}
