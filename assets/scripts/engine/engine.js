'use strict'
const api = require('./api.js')
const ui = require('./ui.js')
const games = require('./games.js')
const players = require('../auth/players.js')

const startNewGame = function () {
  event.preventDefault()
  console.log('clicked')
  $('.gamecell').empty()
  api.newGame().then(ui.newGameSuccess)
  .catch(ui.newGameFailure)
}

const getGame = function () {
  event.preventDefault()
  api.getGame().then(ui.getGameSuccess)
  .catch(ui.getGameFailure)
}

const killGames = function () {
  event.preventDefault()
  api.killGames().then(ui.destroyGamesSuccess)
  .catch(ui.destroyGamesFailure)
}

const playTurn = function () {
  if (games.gameStarted) {
    console.log('clicked')
    $(this).html('<h1>X</h1>')
    const cellNum = $(this).attr('id')
    console.log(cellNum)
  } else {
    return false
  }
}

const addHandlers = () => {
  $('#newgame').on('submit', startNewGame)
  $('#gamestatus').on('submit', getGame)
  $('#kill-games').on('submit', killGames)
  $('.gamecell').on('click', playTurn)
}

module.exports = {
  addHandlers
}
