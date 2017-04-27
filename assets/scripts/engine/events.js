const api = require('./api')
const ui = require('./ui')

const onGetAlbum = function (event) {
  event.preventDefault()
  api.getAlbum().then(ui.getAlbumSuccess)
  .catch(ui.getAlbumFailure)
}

// Click handlers get input from the html elements when they are clicked
const addHandlers = () => {
  $('#get-album').on('submit', onGetAlbum)
}

// Exports for use in main index file
module.exports = {
  addHandlers
}
