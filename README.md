[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Recommendr

 - Live app: [Recommendr](https://jscohen.github.io/translatr_front/)
 - Front End Repo: [Recommendr](https://github.com/jscohen/translatr_front)
 - Back End Repo: [Recommendr](https://github.com/jscohen/translatr_backend)

## About Recommendr

[Recommendr] is a great way to organize your music and learn about new artists.  The app consists of a back end with user, song, artist and album objects.  One user can have many songs or ablums, one artist can have many albums, and one album can have one song.  Users can create new artists, albums or songs through the front end buttons.  In addition, there is a full user authentication system for users.  Once you've added an artist, you can select the recommend feature, which will list other artists of the same genre from the Recommendr database.

## Project Planning

This project turned out much differently than I originally planned.  At first, I wanted to make an app that would translate song lyrics from one language to another.  However, the only feasible way to do translation in our time frame was to use a third party API, none of which would work in the framework of my app.  I improvised by creating the recommendation engine, which gives the user artist recommendations based on their input.  Although I could not make the translating feature, the basic inputs of the app stayed the same so there wasn't much refactoring.

Although I planned out the resource relationships and made mockups in advance, I should have more thoroughly researched the feasability of creating a translator.  However, the recommendation feature uses the same engine.

[Wireframe](http://i.imgur.com/vfEc5af.jpg)

[Game logic mock-up](http://i.imgur.com/NGiAYz8.jpg)

### User Stories

 - I want to categorize my music based on album, song and artist
 - I want to see the albums, songs and artists that I have already entered
 - I want to get recommendations for new artists based on my input to the app


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

### Stretch Goals

I probably will not complete the additional challenge of getting this app into mobile form.

## Additional Tech

I stuck to the tech we've covered almost exclusively, the only tech I added was a pair of Google custom fonts.

[Google Fonts](https://fonts.google.com/)

## Next Steps

 - Build Mobile Functionality
 - Build multiple device functionality
 - Check for more bugs and errors

 ## [License](LICENSE)

 1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
 2.  All software code is licensed under GNU GPLv3.
