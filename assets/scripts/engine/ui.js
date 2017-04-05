const newGameSuccess = () => {
  console.log('New Game Created')
}

const newGameFailure = (error) => {
  console.error(error)
}

const getGameSuccess = (data) => {
  console.log('Got Created')
  console.log(data)
}

const getGameFailure = (error) => {
  console.error(error)
}

module.exports = {
  newGameSuccess,
  newGameFailure,
  getGameSuccess,
  getGameFailure
}
