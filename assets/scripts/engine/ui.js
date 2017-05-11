const albums = require('./albums')
const artist = require('./artist')
const users = require('../auth/users')
const songs = require('./songs')
const getFormFields = require(`../../../lib/get-form-fields`)

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
    if (data.artists[i].user_id === users.user.user.id) {
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
  songs.song = data
  const events = require('./events')
  $('.show-songs').empty()
  for (let i = 0; i < data.songs.length; i++) {
    if (data.songs[i].user_id === users.user.user.id) {
      $('.show-songs').append('<span id = span' + data.songs[i].id + '>Song Title: ' + data.songs[i].name + ' Song ID: ' + data.songs[i].id +
      '<form id=' + data.songs[i].id + '>' +
      '<input type="text" name="song[name]" id="add-song-name" placeholder="Enter Song Name">' +
      '<input type="text" name="song[album]" id="add-song-album" placeholder="Enter Album Name">' +
      '<input type="submit" id=' + data.songs[i].id + ' class="btn btn-primary btn-top" name="submit" value="Update a Song">' +
      '</form>' +
      '<form id =del' + data.songs[i].id + '><input type="submit" class="btn btn-primary btn-top" name="submit" value="Delete This Song">' +
      '</form></span>' + '<br />' +
      '<form id=lyrics' + data.songs[i].id + '><input type="submit" class="btn btn-primary" name="submit" value="Get Lyrics">' +
      '</form>')
      $('#' + data.songs[i].id).on('submit', function () {
        event.preventDefault()
        const songs = getFormFields(this)
        songs.song.id = data.songs[i].id
        songs.song.user_id = users.user.user.id
        events.updateSong(songs)
      })
      $('#del' + data.songs[i].id).on('submit', function () {
        event.preventDefault()
        const id = data.songs[i].id
        const testData = {
          'song': {
            'user_id': users.user.user.id
          }
        }
        events.deleteSong(id, testData)
      })
      $('#lyrics' + data.songs[i].id).on('submit', function () {
        event.preventDefault()
        const lyricsData = {
          'lyrics': {
            'song_id': data.songs[i].id,
            'artist': data.songs[i].artist,
            'title': data.songs[i].name
          }
        }
        events.onGetLyrics(lyricsData)
      })
    }
  }
}
// Show song we just added
const addSongSuccess = (data) => {
  // const events = require('./events')
  $('.song_msg').text('You added ' + data.song.name + ' with an ID of ' + data.song.id)
  // if (($('.show-songs').has('span').length ? 'yes' : 'no') === 'yes') {
  //   $('.show-songs').append('<span id = span' + data.song.id + '>Song Title: ' + data.song.name + ' Song ID: ' + data.song.id +
  //   '<form id=' + data.song.id + '>' +
  //   '<input type="text" name="song[name]" id="add-song-name" placeholder="Enter Song Name">' +
  //   '<input type="text" name="song[album]" id="add-song-album" placeholder="Enter Album Name">' +
  //   '<input type="submit" id=' + data.song.id + ' class="btn btn-primary btn-top" name="submit" value="Update a Song">' +
  //   '</form>' +
  //   '<form id =del' + data.song.id + '><input type="submit" class="btn btn-primary btn-top" name="submit" value="Delete This Song">' +
  //   '</form></span>' + '<br />')
  //   $('#' + data.song.id).on('submit', function () {
  //     event.preventDefault()
  //     const songs = getFormFields(this)
  //     songs.song.id = data.song.id
  //     songs.song.user_id = users.user.user.id
  //     events.updateSong(songs)
  //   })
  //   $('#del' + data.song.id).on('submit', function () {
  //     event.preventDefault()
  //     const id = data.song.id
  //     const testData = {
  //       'song': {
  //         'user_id': users.user.user.id
  //       }
  //     }
  //     events.deleteSong(id, testData)
  //   })
  // }
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

const updateSongSuccess = (data) => {
  const events = require('./events')
  $('.song_msg').text('Song ' + data.song.name + ' has been updated')
  events.onGetSongsNew()
  // const cache = $('#span' + data.song.id).children()
  // $('#span' + data.song.id).text('The song has been updated to be ' + data.song.name + ' by ' + data.song.artist + ' with an ID of ' + data.song.id)
  // .append(cache)
  // $('#' + data.song.id).on('submit', function () {
  //   event.preventDefault()
  //   const songs = getFormFields(this)
  //   songs.song.id = data.song.id
  //   songs.song.user_id = users.user.user.id
  //   events.updateSong(songs)
  // })
  // $('#del' + data.song.id).on('submit', function () {
  //   event.preventDefault()
  //   const id = data.song.id
  //   const testData = {
  //     'song': {
  //       'user_id': users.user.user.id
  //     }
  //   }
  //   events.deleteSong(id, testData)
  // })
}

const updateSongFailure = (data) => {
  $('.song_msg').text('There was a problem updating your song')
}

const deleteSongSuccess = (id) => {
  const events = require('./events')
  events.onGetSongsNew()
  $('.song_msg').text('You have successfully deleted this song')
}

const deleteSongFailure = (data) => {
  $('.song_msg').text('There was a problem deleting this song')
}

module.exports = {
  getAlbumSuccess,
  deleteSongSuccess,
  deleteSongFailure,
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
  deleteAlbumFail,
  updateSongSuccess,
  updateSongFailure
}
