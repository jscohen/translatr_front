[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Translatr

 - Live app: [Translater](https://jscohen.github.io/translatr_front/)
 - Front End Repo: [Translatr](https://github.com/jscohen/translatr_front)
 - Back End Repo: [Translatr](https://github.com/jscohen/translatr_backend)
 - Live app back end: [Translatr](https://boiling-gorge-32374.herokuapp.com/)

## About Translatr

[Translatr] is an app that allows you to maintain a list of songs, albums and artists, find recommendations based on artists you like, and get the lyrics to any song you added and translate them if they are in a foreign language.  The app has the same user functionality has the Tic Tac Toe app we made earlier.  The back end is based off of the artist, song, album and lyric resources and two third party APIs provide the abililty to get lyrics and translate them.

## Project Planning

This project turned out much differently than I originally planned.  I had not considered the difficulty of using third party APIs or the complexity of the relationships.  Originally I mapped out Song, Lyric and Artist entities.  An Artist would have many songs, an Artist would have many albums, and a song would have one Album.  The foreign keys would be artist ID in song and song ID and artist ID in album.

The relationships I actually made were more complex.  I had to create albums that belonged to both artists and users and had many songs.  So the foreign keys were artist ID and user ID.  I created an Artist resource that has many songs and belongs to user, with a foreign key of user id.  I also made a Song resource that belongs to Artist, User and Album.  I originally thought that the Ablum would bring the relationships together, it turned out to be Song that does that.

Finally, I realized later that I had to make a new resource for the translations.  I made the Lyric resource for this and set it to belong to song.  In the back end, I made two additional programs, lyrics-api.rb, and translate-api.rb, to handle the functionality.  This required a significant amount of improvisation as I had not used third party APIs in the past.  I used the musixmatch API to get song lyrics and the glosbe API to translate the lyrics.

[Original Resource Relations](http://i.imgur.com/KpPiMIh.jpg)
[Actual Resource Relations](http://i.imgur.com/XdImP7V.jpg)

### User Stories

 - I want to categorize my music based on album, song and artist
 - I want to see the albums, songs and artists that I have already entered
 - I want to get recommendations for new artists based on my input to the app
 - I want to be able to see the lyrics for any song I enter
 - I want to be able to translate the lyrics of foreign language songs into English


### User Stories (stretch)
 - I would like to be able to use this app on a smartphone

## Development Process

This is my first full stack app, and I decided to begin with the user authentication.  I used the same platform and logic for it as with my tic tac toe game, so it was not difficult to implement.  I tested it on the backend with curl scripts until there was full CRUD functionality.

The next step was to create the album, song and artist resources which were the bulk of the functionality.  I began by scaffolding each resource and building CRUD functionality for each one at a time.  After each resource had full CRUD functionality, I established the relationships with migrations.  Due to my unfamiliarity with rails syntax, I sometimes established the wrong relationship by accident and had to roll back.  The final relationships are:

Album belongs to Artist and user
One User has many albums
One Artist has many albums

Albums have many songs

Songs belong to artists, users and albums
An artist can have many songs
A user can have many songs
An album can have many songs

Artists have many songs
One user can have many artists

Finally, I created the translation functionality.  I created a new lyrics resource to handle this that was linked to the Song resource via song id.  A lyric resource is created from the front end by providing a song ID, name and artist.  The Lyric resource has a text field which I use to store the song's original lyrics.  To get the lyrics, I put in the song information gathered from the parameters to the MusixMatch API in the lyrics-api.rb file.  Because of the structure of this API, I had to make two calls: one to look up the song and get the track ID, and a second call using the track ID to get the song's lyrics.  The API returned a large hash array, and I had to use several layers of iteration to get the data that I needed.

After the song's lyrics are stored in the Lyric resource, I passed them to the Yandex API to get a translation.  This presented some unresolved difficulties.  Firstly, I did my translations from Italian, which has special non-ASCII characters.  I had to createa a function to make everything ASCII compliant before I could do the translation, which in the process changed the orignal lyrics.  I have not yet resolved this bug.  Because of the nature of internet translators, the translation this API provides is a bit awkward.

### Stretch Goals

I probably will not complete the additional challenge of getting this app into mobile form.  In addition, I want to make the app look better and be more usable.

## Additional Tech

I used two third party APIs to get song lyrics and translate them.

Yandex Translater API [Yandex](https://tech.yandex.com/translate/)

I got a free API key by registering with the site and after that I was able to pass it ASCII-compliant calls.  Yandex has the feature of detecting the language of your text submission, allowing me to easily allow translation in multiple languages with no extra work.  However, substituting ASCII characters in caused some difficulty and I also lost the line breaks from the original lyrics.  A Yandex call goes as follows:

https://translate.yandex.net/api/v1.5/tr.json/translate?&key=API_KEY&language=it-en&text=cosa

In this instance, the call is an italian to English translation of the word 'cosa', which means what.

MusixMatch API [MusixMatch] (https://developer.musixmatch.com/documentation)

I used the MusixMatch API to get song lyrics for songs I selected.  I had to make one call to search for the track in the system using the artist and track I was looking for.  For example:

http://api.musixmatch.com/ws/1.1/track.search?apikey=KEY&q_artists=laura%20pausini&q_track=la%20solitudine

This calls the system to look for a track called La Solitudine by Laura Pausini, which I translated into English.  It also provides the track ID for the next call which gets the song's lyrics:

http://api.musixmatch.com/ws/1.1/track.lyrics.get?API_KEY&track_id=3

Using the track ID of 3, this call provides the song's lyrics.
