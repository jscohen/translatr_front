'use strict'
const games = require('./games.js')

// Success function for new game Created
// Log the creation of the game and set local game object variable to true
// Call the Join Game function to a second API call that adds player 2 to the game
const newGameSuccess = (data) => {
  $('.game-log').text('Game started!  Lets Go!')
  games.game = data
  games.gameStarted = true
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

// When the game gets updated on the API, do nothing
const updateGameSuccess = (game) => {
  return true
}

const updateGameFail = () => {
  $('.game-log').text('Game update failed!')
  return false
}

module.exports = {
  newGameSuccess,
  newGameFailure,
  getGameSuccess,
  getGameFailure,
  updateGameSuccess,
  updateGameFail
}
