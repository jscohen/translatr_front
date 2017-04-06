'use strict'
const api = require('./api.js')
const ui = require('./ui.js')
const games = require('./games.js')

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
    $(this).html('<h1>X</h1>')
    let cellNum = $(this).attr('id')
    cellNum = getCellNum(cellNum)
    const gameArr = games.game.game.cells
    const array = addCell(cellNum, gameArr)
    console.log(array)
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

const addHandlers = () => {
  $('#newgame').on('submit', startNewGame)
  $('#gamestatus').on('submit', getGame)
  $('#kill-games').on('submit', killGames)
  $('.gamecell').on('click', playTurn)
}

module.exports = {
  addHandlers
}
