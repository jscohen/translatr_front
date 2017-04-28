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
  const data = getFormFields(this)
  data.album.user_id = users.user.user.id
  console.log(data)
  api.addAlbum(data).then(ui.addAlbumSuccess)
  .catch(ui.addAlbumFailure)
}

const onAddArtist = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.addArtist(data).then(ui.addArtistSuccess)
  .catch(ui.addArtistFailure)
}

const onGetArtists = function (event) {
  event.preventDefault()
  api.getArtists().then(ui.getArtistSuccess)
  .catch(ui.getArtistFailure)
}

const onAddSong = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.addSong(data).then(ui.addSongSuccess).catch(ui.addSongFailure)
}

const getLyrics = function (event) {
  event.preventDefault()
  api.getLyrics().then(ui.getLyricsSuccess).catch(ui.getLyricsFailure)
}

// Click handlers get input from the html elements when they are clicked
const addHandlers = () => {
  $('#album-by-user').on('submit', onGetAlbum)
  $('#add-album').on('submit', onAddAlbum)
  $('#add-artist').on('submit', onAddArtist)
  $('#get-artists').on('submit', onGetArtists)
  $('#add-song').on('submit', onAddSong)
  $('#get-lyrics').on('submit', getLyrics)
}

// Exports for use in main index file
module.exports = {
  addHandlers, getUserAlbums
}
