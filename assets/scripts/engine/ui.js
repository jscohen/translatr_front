const albums = require('./albums')

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
}

const addArtistFailure = (data) => {
  console.log(data.error)
}

module.exports = {
  getAlbumSuccess, getAlbumFailure, addArtistSuccess, addArtistFailure
}
