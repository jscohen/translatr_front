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

const counter = 1
let turn = 1

const playTurn = function () {
  if (players.player2 === undefined) {
    $('.pl').text('You need two players to play')
    return false
  }
  const X = 'X'
  const O = 'O'
  let cell = $(this).attr('id')
  cell = '#' + cell
  const gameArr = games.game.game.cells
  console.log(turn)
  if (games.gameStarted && turn % 2 === 1) {
    doTurn(cell, '<h1>X</h1>', gameArr, turn, X)
    $('.pl').text(players.player1.email + ' played an X in ' + cell)
    console.log(turn)
  } else if (games.gameStarted && turn % 2 === 0) {
    console.log(turn)
    doTurn(cell, '<h1>O</h1>', gameArr, turn, O)
    $('.pl').text(players.player2.email + ' played an O in ' + cell)
  }
  turn = whoseTurn(turn)
}

const whoseTurn = function (counter) {
  counter = counter + 1
  return counter
}

const doTurn = function (cell, value, gameArr, turn, letter) {
  $(cell).html(value)
  styleCell(cell, letter)
  cell = getCellNum(cell)
  const array = addCell(cell, gameArr, letter)
  games.game.game.cells = array
  return whoseTurn(turn)
}

const getCellNum = function (cell) {
  cell = cell.substring(5)
  cell = cell / 1
  return cell
}

const addCell = function (cellNum, array, letter) {
  array[cellNum] = letter
  return array
}

const styleCell = function (cell, letter) {
  if (letter === 'X') {
    $(cell).css('background-color', '#fff')
  } else {
    $(cell).css('background-color', '#ccc')
  }
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
