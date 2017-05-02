const albums = require('./albums')
const artist = require('./artist')
const users = require('../auth/users')
const lyrics = require('./lyrics')

const getAlbumSuccess = (data) => {
  const events = require('./events')
  console.log('success!!')
  albums.album = data
  events.getUserAlbums()
}

const getAlbumFailure = (data) => {
  console.log('failed!')
}

const addArtistSuccess = (data) => {
  console.log(data)
  console.log('Success')
  artist.artist = data
  $('#recommender').show()
}

const addArtistFailure = (data) => {
  console.log(data.error)
}

const getArtistSuccess = (data) => {
  console.log(data)
  console.log('success')
  console.log(data.artists[0].user.id)
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
  console.log(data.error)
}

const getArtistFailure = (data) => {
  console.log('failure')
}

const addAlbumSuccess = (data) => {
  console.log(data)
  console.log('Success')
}

const addAlbumFailure = (data) => {
  console.log(data.error)
  console.log('Failed')
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

const getSongsFailure = (data) => {
  console.log(data.error)
}

const getLyricsSuccess = (data) => {
  console.log(data)
  lyrics.lyric = data.lyric.translation
  for (let i = 0; i < data.lyric.text.length; i++) {
    if (data.lyric.text[i] === '\n') {
      $('.add_lyrics').append('<br />')
    }
    else {
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
  getLyricsSuccess
}
