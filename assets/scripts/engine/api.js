'use strict'
const config = require('../config')
const players = require('../auth/players.js')
const games = require('./games.js')

// This is the API call to create a new game
// The first player's token is used as authorization
const newGame = () => {
  return $.ajax({
    url: config.apiOrigin + '/games/',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + players.player.token
    }
  })
}

// API call to get all games for a players
// The token is used to identify the player
const getGame = (token) => {
  return $.ajax({
    url: config.apiOrigin + '/games/',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + token
    }
  })
}

// API used to get a single game
// Game ID is used to get the game and player 1's token is used to authorize
const getAGame = (id) => {
  return $.ajax({
    url: config.apiOrigin + '/games/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + players.player.token
    }
  })
}

// Player 2 join game API call
// This function uses the game ID and player 2's token to assign player 2 to
// the current game
const joinGame = () => {
  return $.ajax({
    url: config.apiOrigin + '/games/' + games.game.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + players.player.token
    }
  })
}

// Update Game API call
// Uses game ID to find the game, and player 1 token to authorize
// The data field sends the data from the local game object to the server
const updateGame = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/games/' + games.game.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + players.player.token
    },
    data
  })
}

// Export functions for future use
module.exports = {
  newGame,
  getGame,
  joinGame,
  updateGame,
  getAGame
}
