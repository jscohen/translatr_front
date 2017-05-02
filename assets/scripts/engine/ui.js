const albums = require('./albums')
const artist = require('./artist')
const users = require('../auth/users')
const lyrics = require('./lyrics')

const getAlbumSuccess = (data) => {
  const events = require('./events')
  albums.album = data
  events.getUserAlbums()
}

const getAlbumFailure = (data) => {
  console.log(data.error)
}

const addArtistSuccess = (data) => {
  artist.artist = data
  $('#recommender').show()
  $('.artist_msg').text('You added ' + data.artist.name + ' with an ID of ' + data.artist.id)
}

const addArtistFailure = (data) => {
  $('.artist_msg').text('There was a problem adding this artist')
}

const getArtistSuccess = (data) => {
  $('.artists').children().remove()
  for (let i = 0; i < data.artists.length; i++) {
    if (data.artists[i].user.id === users.user.user.id) {
      $('.artists').append('<li>' + data.artists[i].name + ' Artist ID: ' + data.artists[i].id + '</li>')
    }
  }
}

const getRecommenderSuccess = (data) => {
  let topTen = 0
  for (let i = 0; i < data.artists.length; i++) {
    if (data.artists[i].genre === artist.artist.artist.genre && topTen <= 10) {
      $('.recommendations').append('<li>' + data.artists[i].name + ' Artist ID: ' + data.artists[i].id + '</li>')
      topTen += 1
    }
  }
}

const getRecommenderFailure = (data) => {
  $('.recommendations').text('There was an error with your recommendations')
}

const getArtistFailure = (data) => {
  console.log('failure')
}

const addAlbumSuccess = (data) => {
  console.log(data)
  $('.album_msg').text('You added album ' + data.album.name + ' with an id of ' + data.album.id)
}

const addAlbumFailure = (data) => {
  $('.album_msg').text('There was a problem with adding your album')
}

const getSongsSuccess = (data) => {
  console.log(data)
  console.log(users.user.user.id)
  for (let i = 0; i < data.songs.length; i++) {
    if (data.songs[i].user_id === users.user.user.id) {
      $('.show-songs').append('<li>Song Title: ' + data.songs[i].name + ' Song ID: ' + data.songs[i].id + '</li>')
      console.log('test')
    }
  }
}

const addSongSuccess = (data) => {
  $('.song_msg').text('You added ' + data.song.name + ' with an ID of ' + data.song.id)
}

const addSongFailure = (data) => {
  $('.song_msg').text('There was a problem adding your song')
}

const getSongsFailure = (data) => {
  console.log(data.error)
}

const getLyricsSuccess = (data) => {
  console.log(data)
  lyrics.lyric = data.lyric.translation
  for (let i = 0; i < data.lyric.text.length; i++) {
    if (data.lyric.text[i] === '\n') {
      $('.add_lyrics').append('<br />')
    } else {
      $('.add_lyrics').append(data.lyric.text[i])
    }
  }
}

const getLyricsFailure = (data) => {
  console.log(data.error)
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
  addSongFailure
}
