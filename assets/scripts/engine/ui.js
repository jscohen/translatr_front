const users = require('../auth/users')
const songs = require('./songs')
const lyrics = require('./lyrics')
const getFormFields = require(`../../../lib/get-form-fields`)

// Show songs if we can get them
const getSongsSuccess = (data) => {
  songs.song = data
  const events = require('./events')
  // Empty html of songs
  $('.show-songs').empty()
  let songsCount = 0

  // Iterate through songs array
  for (let i = 0; i < data.songs.length; i++) {
    // If the song's user ID matches the current user's ID
    if (data.songs[i].user_id === users.user.user.id) {
      songsCount += 1
      // Append the song name for each song
      $('.show-songs').append('<span id = span' + data.songs[i].id + '>Song Title: ' + data.songs[i].name + ' Song ID: ' + data.songs[i].id + ' on album ' + data.songs[i].album + ' by ' + data.songs[i].artist +
      // Append HTML for updates
      '<form id=' + data.songs[i].id + '>' +
      '<input type="text" name="song[artist]" id="add-song-name" placeholder="Enter Artist Name">' +
      '<input type="text" name="song[name]" id="add-song-name" placeholder="Enter Song Name">' +
      '<input type="text" name="song[album]" id="add-song-album" placeholder="Enter Album Name">' +
      '<input type="submit" id=' + data.songs[i].id + ' class="btn btn-primary btn-top" name="submit" value="Update a Song">' +
      // Append HTML for deletes
      '</form>' +
      '<form id =del' + data.songs[i].id + '><input type="submit" class="btn btn-primary btn-top" name="submit" value="Delete This Song">' +
      '</form></span>' + '<br />' +
      // Append HTML for lyrics
      '<form id=lyrics' + data.songs[i].id + '><input type="submit" class="btn btn-primary" name="submit" value="Get Lyrics">'
      )
      // Set update event handler
      $('#' + data.songs[i].id).on('submit', function () {
        event.preventDefault()
        const songs = getFormFields(this)
        songs.song.id = data.songs[i].id
        songs.song.user_id = users.user.user.id
        events.updateSong(songs)
      })
      // Set delete event handler
      $('#del' + data.songs[i].id).on('submit', function () {
        event.preventDefault()
        const id = data.songs[i].id
        // Create object data for delete song call
        const testData = {
          'song': {
            'user_id': users.user.user.id
          }
        }
        events.deleteSong(id, testData)
      })
      // Set lyrics event handler
      $('#lyrics' + data.songs[i].id).on('submit', function () {
        event.preventDefault()
        // Create lyrics data
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
  // Show error if no songs
  if (songsCount === 0) {
    $('.show-songs').append('<span id="TEST">You have not added any songs</span>')
  } else {
    $('#TEST').empty()
  }
}
// Show song we just added
const addSongSuccess = (data) => {
  const events = require('./events')
  // Show song info
  $('#TEST').empty()
  $('.song_msg').text('You added ' + data.song.name + ' with an ID of ' + data.song.id)
  // Append all song data (see get songs)
  $('.show-songs').append('<span id = span' + data.song.id + '>Song Title: ' + data.song.name + ' Song ID: ' + data.song.id + ' on album ' + data.song.album + ' by ' + data.song.artist +
  '<form id=' + data.song.id + '>' +
  '<input type="text" name="song[artist]" id="add-song-name" placeholder="Enter Artist Name">' +
  '<input type="text" name="song[name]" id="add-song-name" placeholder="Enter Song Name">' +
  '<input type="text" name="song[album]" id="add-song-album" placeholder="Enter Album Name">' +
  '<input type="submit" id=' + data.song.id + ' class="btn btn-primary btn-top" name="submit" value="Update a Song">' +
  '</form>' +
  '<form id =del' + data.song.id + '><input type="submit" class="btn btn-primary btn-top" name="submit" value="Delete This Song">' +
  '</form></span>' + '<br />' +
  '<form id=lyrics' + data.song.id + '><input type="submit" class="btn btn-primary" name="submit" value="Get Lyrics">'
  )
  // Add update song event
  $('#' + data.song.id).on('submit', function () {
    event.preventDefault()
    const songs = getFormFields(this)
    songs.song.id = data.song.id
    songs.song.user_id = users.user.user.id
    events.updateSong(songs)
  })
  // Add delete song event
  $('#del' + data.song.id).on('submit', function () {
    event.preventDefault()
    const id = data.song.id
    const testData = {
      'song': {
        'user_id': users.user.user.id
      }
    }
    events.deleteSong(id, testData)
  })
  // Add lyrics event and data
  $('#lyrics' + data.song.id).on('submit', function () {
    event.preventDefault()
    const lyricsData = {
      'lyrics': {
        'song_id': data.song.id,
        'artist': data.song.artist,
        'title': data.song.name
      }
    }
    events.onGetLyrics(lyricsData)
  })
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
  lyrics.lyric = data.lyric
}

// Throw error if we can't get lyrics
const getLyricsFailure = (data) => {
  $('.add_lyrics').text('There was a problem getting your lyrics.  If you entered a non-English song, check for non-ASCII characters.' +
  'If you entered an English song, check your spelling and make sure the song, artist and album line up.')
}

// If update song call is a success, append the data to HTML
// Then run get songs to refresh the list
const updateSongSuccess = (data) => {
  const events = require('./events')
  $('.song_msg').text('Song ' + data.song.name + ' by ' + data.song.artist + ' on ' + data.song.album + ' has been updated')
  $('#span' + data.song.id).text('Song ' + data.song.name + ' by ' + data.song.artist + ' on ' + data.song.album + ' has been updated')
  events.onGetSongsNew()
}

// Log an error if update song fails
const updateSongFailure = (data) => {
  $('.song_msg').text('There was a problem updating your song')
}

// If delete song API is a success, run get songs to refresh list
const deleteSongSuccess = () => {
  const events = require('./events')
  events.onGetSongsNew()
  $('.song_msg').text('You have successfully deleted this song')
}

// If delete song fails, log an error
const deleteSongFailure = (data) => {
  $('.song_msg').text('There was a problem deleting this song')
}

module.exports = {
  deleteSongSuccess,
  deleteSongFailure,
  getSongsSuccess,
  getSongsFailure,
  getLyricsFailure,
  getLyricsSuccess,
  addSongSuccess,
  addSongFailure,
  updateSongSuccess,
  updateSongFailure
}
