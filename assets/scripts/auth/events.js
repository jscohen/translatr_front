'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')
const players = require('./players')

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.signUp(data).then(ui.signUpSuccess)
  .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.signIn(data).then(ui.signUpSuccess)
  .catch(ui.signInFailure)
}

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

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
  $('#change-password').on('submit', onChangePW)
}

module.exports = {
  addHandlers
}
