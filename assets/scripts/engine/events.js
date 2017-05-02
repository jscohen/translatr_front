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
  console.log(albums.album.albums)
  for (let i = 0; i < albums.album.albums.length; i++) {
    if (users.user.user.id === albums.album.albums[0].user.id) {
      console.log(albums.album.albums[0])
      $('.show-albums').append('Album: '+ i + ' Title: ' + albums.album.albums[0].name + ' Artist: ' + albums.album.albums[i].artist.name +
      ' Songs: ' + albums.album.albums[i].songs.name + '<br />')
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
  console.log(data)
  data.artist.user_id = users.user.user.id
  api.addArtist(data).then(ui.addArtistSuccess)
  .catch(ui.addArtistFailure)
}

const onGetArtists = function (event) {
  console.log('test')
  event.preventDefault()
  api.getArtists().then(ui.getArtistSuccess)
  .catch(ui.getArtistFailure)
}

const onAddSong = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  data.song.user_id = users.user.user.id
  console.log(data)
  api.addSong(data).then(ui.addSongSuccess).catch(ui.addSongFailure)
}

const onGetSongs = function (event) {
  event.preventDefault()
  api.getSongs().then(ui.getSongsSuccess).catch(ui.getSongsFailure)
}

const onRecommend = function (event) {
  event.preventDefault()
  api.getArtists().then(ui.getRecommenderSuccess)
  .catch(ui.getRecommenderFailure)
}

const onGetLyrics = function (event) {
  const data = getFormFields(this)
  console.log(data)
  event.preventDefault()
  api.getLyrics(data).then(ui.getLyricsSuccess).catch(ui.getLyricsFailure)
}

// Click handlers get input from the html elements when they are clicked
const addHandlers = () => {
  $('#album-by-user').on('submit', onGetAlbum)
  $('#add-album').on('submit', onAddAlbum)
  $('#add-artist').on('submit', onAddArtist)
  $('#get-artists').on('submit', onGetArtists)
  $('#add-song').on('submit', onAddSong)
  $('#get-songs').on('submit', onGetSongs)
  $('#recommender').on('submit', onRecommend)
  $('#recommender').hide()
  $('.everything').hide()
  $('#get-lyrics').on('submit', onGetLyrics)
}

// Exports for use in main index file
module.exports = {
  addHandlers, getUserAlbums
}
