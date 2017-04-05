const games = require('./games.js')

const newGameSuccess = (data) => {
  console.log('New Game Created')
  games.game = data
  console.log(games)
  games.gameStarted = true
}

const newGameFailure = (error) => {
  console.error(error)
}

const getGameSuccess = (data) => {
  console.log('Got Games')
  console.log(data)
}

const getGameFailure = (error) => {
  console.error(error)
}

const destroyGamesSuccess = () => {
  console.log('Games Destroyed')
}

module.exports = {
  newGameSuccess,
  newGameFailure,
  getGameSuccess,
  getGameFailure,
  destroyGamesSuccess
}
