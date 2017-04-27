const albums = require('./albums')
const artist = require('./artist')
const users = require('../auth/users')

const getAlbumSuccess = (data) => {
  console.log('success!!')
  albums.album = data
}

const getAlbumFailure = (data) => {
  console.log('failed!')
}

const addArtistSuccess = (data) => {
  console.log(data)
  console.log('Success')
  artist.artist = data
}

const addArtistFailure = (data) => {
  console.log(data.error)
}

const getArtistSuccess = (data) => {
  console.log(data)
  console.log('success')
  console.log(data.artists[0].user_id)
  for (let i = 0; i < data.artists.length; i++) {
    if (data.artists[i].user_id === users.user.user.id) {
      $('.artists').append('<li>' + data.artists[i].name + '</li>')
    }
  }
}

const getArtistFailure = (data) => {
  console.log('failure')
}

module.exports = {
  getAlbumSuccess, getAlbumFailure, addArtistSuccess, addArtistFailure, getArtistSuccess, getArtistFailure
}
