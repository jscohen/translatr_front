'use strict'

const players = require('./players.js')
const config = require('../config')

// Sign up AJAX Call
// Takes in form data and creates a new user in the game-api
const signUp = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}

// Sign in AJAX Call
// Takes credentials entered in the sign-in modal and creates a new user
const signIn = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/sign-in/',
    method: 'POST',
    data
  })
}

// Sign out method signs out the current players
// If there are two players, the other will be signed in
// Identifies the player by checking if there is a second player
const signOut = () => {
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + players.player.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + players.player.token
    }
  })
}

// Change password AJAX call: takes input from modal and patches the players'
// record on the server with the new pw
const changePW = (data, playerID, playerToken) => {
  return $.ajax({
    url: config.apiOrigin + '/change-password/' + playerID,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + playerToken
    },
    data
  })
}

// Exports all of these functions for future use
module.exports = {
  signUp,
  signIn,
  signOut,
  changePW
}
