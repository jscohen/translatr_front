'use strict'
const config = require('../config')
const players = require('../auth/players.js')
const games = require('./games.js')

const newGame = () => {
  return $.ajax({
    url: config.apiOrigin + '/games/',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + players.player1.token
    }
  })
}

const getGame = () => {
  return $.ajax({
    url: config.apiOrigin + '/games/' + games.game.game.id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + players.player1.token
    }
  })
}

const killGames = () => {
  return $.ajax({
    url: config.apiOrigin + '/games/',
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + players.player1.token
    }
  })
}

const joinGame = () => {
  console.log('Join Game Going')
  return $.ajax({
    url: config.apiOrigin + '/games/' + games.game.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + players.player2.token
    }
  })
}

module.exports = {
  newGame,
  getGame,
  killGames,
  joinGame
}
