const games = require('./games.js')
const api = require('./api.js')

const newGameSuccess = () => {
  console.log('New Game Created')
  games.game1 = api.getGame()
  console.log(games.game1)
}

const newGameFailure = (error) => {
  console.error(error)
}

module.exports = {
  newGameSuccess,
  newGameFailure
}
