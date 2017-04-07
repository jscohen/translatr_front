const games = require('./games.js')
const engine = require('./engine.js')
const api = require('./api')
const players = require('../auth/players.js')

const newGameSuccess = (data) => {
  console.log('New Game Created')
  $('.game-log').text('Game started!  Lets Go!')
  games.game = data
  console.log(games)
  games.gameStarted = true
  console.log(engine)
  api.joinGame().then(joinGameSuccess).catch(joinGameFailure)
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

const joinGameSuccess = () => {
  console.log('Player 2 Joined')
  games.game.game.player_o = players.player2
  console.log(games.game.game)
}

const joinGameFailure = (error) => {
  console.log('There was an error')
  console.error(error)
}

const updateGameSuccess = (game) => {
  console.log(game)
  console.log('Game Updated')
}

const updateGameFail = (error) => {
  console.log('fail')
  console.error(error)
}

module.exports = {
  newGameSuccess,
  newGameFailure,
  getGameSuccess,
  getGameFailure,
  destroyGamesSuccess,
  joinGameSuccess,
  joinGameFailure,
  updateGameSuccess,
  updateGameFail
}
