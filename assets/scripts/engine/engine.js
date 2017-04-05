'use strict'
const api = require('./api.js')
const ui = require('./ui.js')

const startNewGame = function () {
  event.preventDefault()
  console.log('clicked')
  $('.gamecell').empty()
  api.newGame().then(ui.newGameSuccess)
  .catch(ui.newGameFailure)
}

const addHandlers = () => {
  $('#newgame').on('submit', startNewGame)
}

module.exports = {
  addHandlers
}
