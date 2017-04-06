'use strict'

const players = require('./players.js')

const config = require('../config')

const signUp = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}

const signIn = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/sign-in/',
    method: 'POST',
    data
  })
}

const signOut = () => {
  if (players.player2 === undefined) {
    return $.ajax({
      url: config.apiOrigin + '/sign-out/' + players.player1.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + players.player1.token
      }
    })
  } else {
    return $.ajax({
      url: config.apiOrigin + '/sign-out/' + players.player2.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + players.player2.token
      }
    })
  }
}

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

module.exports = {
  signUp,
  signIn,
  signOut,
  changePW
}
