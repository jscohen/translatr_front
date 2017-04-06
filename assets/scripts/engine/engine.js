'use strict'
const api = require('./api.js')
const ui = require('./ui.js')
const games = require('./games.js')
const players = require('../auth/players.js')

const startNewGame = function () {
  event.preventDefault()
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
    $(this).html('<h1>X</h1>')
    let cellNum = $(this).attr('id')
    cellNum = getCellNum(cellNum)
    const gameArr = games.game.game.cells
    const array = addCell(cellNum, gameArr)
    console.log(array)
    console.log(games.game.game)
  } else {
    return false
  }
}

const getCellNum = function (cell) {
  cell = cell.substring(4)
  cell = cell / 1
  return cell
}

const addCell = function (cellNum, array) {
  array[cellNum] = 'X'
  return array
}

const p2joinGame = function () {
  event.preventDefault()
  console.log('Join Game Started')
  if (games.game.game === undefined) {
    $('.pl').text('You need to start a game first!')
    return false
  }
  api.joinGame().then(ui.joinGameSuccess)
  .catch(ui.joinGameFailure)
}

const player1Turn = function (isTrue) {
  if (isTrue === undefined) {
    return true
  } else {
    return isTrue
  }
}

const addHandlers = () => {
  $('#newgame').on('submit', startNewGame)
  $('#gamestatus').on('submit', getGame)
  $('#kill-games').on('submit', killGames)
  $('.gamecell').on('click', playTurn)
  $('#join-game').on('submit', p2joinGame)
}

module.exports = {
  addHandlers
}
