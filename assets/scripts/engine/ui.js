'use strict'
const games = require('./games.js')
const api = require('./api')
const players = require('../auth/players.js')

// Success function for new game Created
// Log the creation of the game and set local game object variable to true
// Call the Join Game function to a second API call that adds player 2 to the game
const newGameSuccess = (data) => {
  $('.game-log').text('Game started!  Lets Go!')
  games.game = data
  games.gameStarted = true
  api.joinGame().then(joinGameSuccess).catch(joinGameFailure)
}

// Log an error if a new game can't be created
const newGameFailure = () => {
  $('.game-log').text('Something went wrong creating your game!')
}

// If you successfully got the list of games, go the the getWins function to log the number of wins
const getGameSuccess = (data) => {
  const engine = require('./engine.js')
  engine.getWins(data)
}

// Error handler for failure to get game list
const getGameFailure = () => {
  $('.game-log').text('Something went wrong getting your games')
}

// If player 2 joined succesfully, set the local game object and log it
const joinGameSuccess = () => {
  games.game.game.player_o = players.player2
  $('.game-log').text(players.player2.email + ' is now in the game')
}

// Log an error if join game fails
const joinGameFailure = () => {
  $('.game-log').text('Player 2 could not join')
}

// When the game gets updated on the API, do nothing
const updateGameSuccess = (game) => {
  return true
}

const updateGameFail = () => {
  $('.game-log').text('Game update failed!')
  return false
}

// For individual games, go to the showAGame function to
// show the result of that game
const gameIDSuccess = (data) => {
  const engine = require('./engine.js')

  const arr = data.game.cells
  const id = data.game.id
  const player1 = data.game.player_x.email
  const player2 = data.game.player_o.email

  engine.showAGame(arr, id, player1, player2)
}

// If the Game ID is wrong, log the failure
const gameIDFailure = () => {
  $('.game-log').text('Did you type in the incorrect game number?')
}

module.exports = {
  newGameSuccess,
  newGameFailure,
  getGameSuccess,
  getGameFailure,
  joinGameSuccess,
  joinGameFailure,
  updateGameSuccess,
  updateGameFail,
  gameIDSuccess,
  gameIDFailure
}
