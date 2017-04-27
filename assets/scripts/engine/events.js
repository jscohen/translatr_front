const api = require('./api')
const ui = require('./ui')
const albums = require('./albums')
const users = require('../auth/users')
const getFormFields = require(`../../../lib/get-form-fields`)

const onGetAlbum = function (event) {
  event.preventDefault()
  api.getAlbum().then(ui.getAlbumSuccess)
  .catch(ui.getAlbumFailure)
}

const getUserAlbums = function () {
  event.preventDefault()
  console.log('test')
  console.log(users.user.user.id)
  for (let i = 0; i < albums.album.albums.length; i++) {
    if (users.user.user.id === albums.album.albums[i].user.id) {
      console.log(albums.album.albums[i])
    }
  }
}

const onAddAlbum = function () {
  event.preventDefault()
  api.addAlbum().then(ui.addAlbumSuccess)
  .catch(ui.addAlbumFailure)
}

const onAddArtist = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.addArtist(data).then(ui.addArtistSuccess)
  .catch(ui.addArtistFailure)
}

// Click handlers get input from the html elements when they are clicked
const addHandlers = () => {
  $('#get-album').on('submit', onGetAlbum)
  $('#album-by-user').on('submit', getUserAlbums)
  $('#add-album').on('submit', onAddAlbum)
  $('#add-artist').on('submit', onAddArtist)
}

// Exports for use in main index file
module.exports = {
  addHandlers, getUserAlbums
}