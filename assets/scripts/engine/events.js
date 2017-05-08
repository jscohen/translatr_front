const api = require('./api')
const ui = require('./ui')
const albums = require('./albums')
const users = require('../auth/users')
const getFormFields = require(`../../../lib/get-form-fields`)
const lyrics = require('./lyrics')

// When the get album button is pushed, this function runs
// It calls the API to get all albums
const onGetAlbum = function (event) {
  event.preventDefault()
  api.getAlbum().then(ui.getAlbumSuccess)
  .catch(ui.getAlbumFailure)
}

// This function is called if the GET request for all albums is successful
const getUserAlbums = function () {
  // Iterate through all the albums and append the ones linked to current
  // user to the HTML
  $('.show-albums').empty()
  for (let i = 0; i < albums.album.albums.length; i++) {
    if (users.user.user.id === albums.album.albums[i].user.id) {
      $('.show-albums').text('Album: ' + i + ' Title: ' + albums.album.albums[i].name + ' Artist: ' + albums.album.albums[i].artist.name +
      ' Songs: ' + albums.album.albums[i].songs.name + '<br />')
    }
  }
}

// This function is run when the add album button is pushed
// It makes an API call to add an album
const onAddAlbum = function () {
  event.preventDefault()
  const data = getFormFields(this)
  data.album.user_id = users.user.user.id
  api.addAlbum(data).then(ui.addAlbumSuccess)
  .catch(ui.addAlbumFailure)
}

// This function is run when the add artist button is pushed
// It makes an API call to add an artist
const onAddArtist = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  data.artist.user_id = users.user.user.id
  api.addArtist(data).then(ui.addArtistSuccess)
  .catch(ui.addArtistFailure)
}

// This function is run when the get artist button is pushed
// It makes an API call to get the artists
const onGetArtists = function (event) {
  event.preventDefault()
  api.getArtists().then(ui.getArtistSuccess)
  .catch(ui.getArtistFailure)
}

// This function is run when the add song button is pushed
// It makes an API call to add the songs
const onAddSong = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  data.song.user_id = users.user.user.id
  api.addSong(data).then(ui.addSongSuccess).catch(ui.addSongFailure)
}

// This function is run when the get song button is pushed
// It makes an API call to get the songs
const onGetSongs = function (event) {
  event.preventDefault()
  api.getSongs().then(ui.getSongsSuccess).catch(ui.getSongsFailure)
}

// This function is run when the recommend button is pushed
// It makes an API call to get the songs by genre
const onRecommend = function (event) {
  event.preventDefault()
  api.getArtists().then(ui.getRecommenderSuccess)
  .catch(ui.getRecommenderFailure)
}

// This function is run when the get lyrics button is pushed
// It makes an API call to get the lyrics by song id
const onGetLyrics = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.getLyrics(data).then(ui.getLyricsSuccess).catch(ui.getLyricsFailure)
}

// This function is run when the translate button is pushed
// It places the translation of the song lyrics into HTML
const translate = function (event) {
  event.preventDefault()
  let wordCount = 0
  // Empty the element so we don't add lyrics on top of each other
  $('.add_translation').empty()
  // Iterate through the translation
  for (let i = 0; i < lyrics.lyric.length; i++) {
    // There are no line breaks in the translation, so add line breaks
    // Every five words
    // Otherwise append the translation to HTML
    if (wordCount === 5) {
      $('.add_translation').append('<br />' + '<span>' + lyrics.lyric[i] + '</span>')
      wordCount = 0
    // If you see a space, we know there is a word, so count the word
    } else if (lyrics.lyric[i] === ' ') {
      wordCount += 1
      $('.add_translation').append('<span>' + lyrics.lyric[i] + '</span>')
    // Stop printing the translation once we hit the * character
    // To get rid of junk text
    } else if (lyrics.lyric[i] === '*') {
      break
    } else {
      $('.add_translation').append('<span>' + lyrics.lyric[i] + '</span>')
    }
  }
}

const updateAlbum = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.updateAlbum(data).then(ui.updateAlbumSuccess).catch(ui.updateAlbumFail)
}

const deleteAlbum = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.deleteAlbum(data).then(ui.deleteAlbumSuccess).catch(ui.deleteAlbumFail)
}

const updateSong = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  data.song.user_id = users.user.user_id
  api.updateSong(data).then(ui.updateSongSuccess).catch(ui.updateSongFailure)
}

const deleteSong = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  data.song.user_id = users.user.user_id
  api.updateSong(data).then(ui.deleteSongSuccess).catch(ui.deleteSongFailure)
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
  $('#translate').on('submit', translate)
  $('#update-album').on('submit', updateAlbum)
  $('#delete-album').on('submit', deleteAlbum)
  $('#update-song').on('submit', updateSong)
  $('#delete-song').on('submit', deleteSong)
}

// Exports for use in main index file
module.exports = {
  addHandlers, getUserAlbums
}
