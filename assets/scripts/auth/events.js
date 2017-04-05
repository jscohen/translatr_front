'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')
const player = require('./players')

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
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onChangePW = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log(data)
  console.log(player.player1.token)
  const getID = function () {
    if (player.player2 !== undefined) {
      return player.player2.id
    } else if (player.player1 !== undefined) {
      return player.player1.id
    }
  }

  const getToken = function () {
    if (player.player2 !== undefined) {
      return player.player2.token
    } else if (player.player1 !== undefined) {
      return player.player1.token
    }
  }
  const playerID = getID()
  const playerToken = getToken()
  console.log(playerID)
  console.log(playerToken)
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
