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
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + players.player.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + players.player.token
    }
  })
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
