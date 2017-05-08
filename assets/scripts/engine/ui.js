const albums = require('./albums')
const artist = require('./artist')
const users = require('../auth/users')
const lyrics = require('./lyrics')

// If we have the albums, store them to a global object
// Call the function that gets albums by user
const getAlbumSuccess = (data) => {
  const events = require('./events')
  albums.album = data
  events.getUserAlbums()
}

// Throw an error if we can't get the albums
const getAlbumFailure = (data) => {
  $('.album_msg').text(data.error)
}

// Show the recommender and append artist if successful
const addArtistSuccess = (data) => {
  artist.artist = data
  $('#recommender').show()
  $('.artist_msg').empty()
  $('.artist_msg').append('<span>You added ' + data.artist.name + ' with an ID of ' + data.artist.id + '</span><br />')
}

// Throw error if we can't add artist
const addArtistFailure = (data) => {
  $('.artist_msg').text('There was a problem adding this artist')
}

// Add artists if we can get them
const getArtistSuccess = (data) => {
  $('.artists').empty()
  for (let i = 0; i < data.artists.length; i++) {
    if (data.artists[i].user.id === users.user.user.id) {
      $('.artists').append('<span>' + data.artists[i].name + ' Artist ID: ' + data.artists[i].id + '</span>' + '<br />')
    }
  }
}

// Populate the recommendations by getting other artists by genre
const getRecommenderSuccess = (data) => {
  $('.recommendations').empty()
  let topTen = 0
  for (let i = 0; i < data.artists.length; i++) {
    if (data.artists[i].genre === artist.artist.artist.genre && topTen <= 10) {
      $('.recommendations').append('<span>' + data.artists[i].name + ' Artist ID: ' + data.artists[i].id + '</span>' + '<br />')
      topTen += 1
    }
  }
}

// Throw an error if the recommender doesn't work
const getRecommenderFailure = (data) => {
  $('.recommendations').text('There was an error with your recommendations')
}

// Throw an error if we can't get artists
const getArtistFailure = (data) => {
  $('.artists').text('There was a problem getting your artists')
}

// Show the album if success
const addAlbumSuccess = (data) => {
  $('.album_msg').text('You added album ' + data.album.name + ' with an id of ' + data.album.id)
}

// Throw error if we can't add an album
const addAlbumFailure = (data) => {
  $('.album_msg').text('There was a problem with adding your album')
}

// Show songs if we can get them
const getSongsSuccess = (data) => {
  $('.show-songs').empty()
  for (let i = 0; i < data.songs.length; i++) {
    if (data.songs[i].user_id === users.user.user.id) {
      $('.show-songs').append('<span>Song Title: ' + data.songs[i].name + ' Song ID: ' + data.songs[i].id + '</span>' + '<br />')
    }
  }
}

// Show song we just added
const addSongSuccess = (data) => {
  $('.song_msg').text('You added ' + data.song.name + ' with an ID of ' + data.song.id)
}

// Throw error if we can't add song
const addSongFailure = (data) => {
  $('.song_msg').text('There was a problem adding your song')
}

// Throw error if we can't get songs
const getSongsFailure = (data) => {
  $('.show-songs').text('There was a problem getting your songs')
}

// Add lyrics to the global object
const getLyricsSuccess = (data) => {
  console.log(data)
  lyrics.lyric = data.lyric.translation
  // Empty any lyrics currently in HTML
  $('.add_lyrics').empty()
  // Iterate through lyrics and append them
  for (let i = 0; i < data.lyric.text.length; i++) {
    if (data.lyric.text[i] === '\n') {
      $('.add_lyrics').append('<br />')
    } else if (data.lyric.text[i] === '*') {
      break
    } else {
      $('.add_lyrics').append('<span>' + data.lyric.text[i] + '</span>')
    }
  }
}

// Throw error if we can't get lyrics
const getLyricsFailure = (data) => {
  $('.add_lyrics').text('There was a problem getting your lyrics - check for non-ASCII characters')
}

const updateAlbumSuccess = (data) => {
  $('.album_msg').text('You updated album ' + data.album.id + ' to be ' + data.album.name)
}

const updateAlbumFail = (data) => {
  $('.album_msg').text('There was a problem updating your album')
}

const deleteAlbumSuccess = (data) => {
  $('.album_msg').text('Album deleted')
}

const deleteAlbumFail = (data) => {
  $('.album_msg').text('Problem deleting album')
}

module.exports = {
  getAlbumSuccess,
  getAlbumFailure,
  addArtistSuccess,
  addArtistFailure,
  getArtistSuccess,
  getArtistFailure,
  addAlbumFailure,
  addAlbumSuccess,
  getSongsSuccess,
  getSongsFailure,
  getRecommenderFailure,
  getRecommenderSuccess,
  getLyricsFailure,
  getLyricsSuccess,
  addSongSuccess,
  addSongFailure,
  updateAlbumSuccess,
  updateAlbumFail,
  deleteAlbumSuccess,
  deleteAlbumFail
}
