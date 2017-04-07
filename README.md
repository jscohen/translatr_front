[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Tic-Tac-Toe Project

 - Live app: [tic-tac-toe](https://jscohen.github.io/tic-tac-toe/)
 - Repo: [tic-tac-toe](https://github.com/jscohen/tic-tac-toe)

## Dependencies

Install with `npm install`.

-   [Webpack](https://webpack.github.io)
-   [Bootstrap](http://getbootstrap.com)
-   [Handlebars.js](http://handlebarsjs.com)

Requires the game-api rails server on the back end.
Activate with the command 'bundle exec rails server'

## About Tic Tac Toe

[tic-tac-toe] is a simple game between two players where each player marks a space on a 3 X 3 board with an X or an O.  If any player gets three in a row, they win.  Games can end in draws if no one wins.

Tic-tac-toe is build in node.js with the premade game-api in rails.  It is a singe page application, meaning that the entire user experience takes place in one markup file with no page refreshes.  This is done via multiple AJAX calls to the game-api server.

My implementatiom of tic-tac-toe has a few interesting features.  Firstly, you can cheat.  If you click the cheat mode button, any winning patterns available on the board will be shown to you.  In addition, you can easily access your games history through the See Your Win Total button.  Clicking this button will show you how many games you've won.  In addition, you can get an overview of any game you've played by entering a game ID in the game menu and clicking the See Results of Any Game button.

The game functions via a log that shows every action the users take and displays warnings, issues and victory messages.  The log is inserted via jQuery into an empty '<span>' element inside an '<h3>'' element.

## Project Planning

I planned for this project by creating some simple wireframes for the front page and by mapping out the game logic visually on paper.  The final product turned out to be quite different than the wireframes, which are admittedly not my area of expertise.  The visuals were generally the same, but the game logic turned out to be more complex than I had expected.

[Wireframe](http://i.imgur.com/vfEc5af.jpg)

[Game logic mock-up](http://i.imgur.com/NGiAYz8.jpg)

### User Stories

 - I want to play tic tac toe with my friends
 - I want to be able to see a record of all my wins whenever I want
 - I want to be able to see the results of any game I play
 - I want to cheat because I am devious

### User Stories (stretch)
 - I want to be able to play with friends across devices
 - I would like to be able to play this game on a smartphone

## Development Process

This is my first full stack app, and I decided to begin with the basics.  I started a markup branch to complete the basic html layout of my page.  I completed this fairly quickly and moved onto the CSS styling.  At first, I only did basic, necessary styling.

The next step was to tackle the API actions for users.  I didn't have any experience in AJAX before this class, but our prior lessons provided great examples.  I set up a sign up, sign in, sign out and change password feature with error checks.  I also greated a global object to store the two players in for future use.  I'm not sure if that's good practice, but it was easier than making tons of API calls to get user info.  The most difficult thing about the user API features were testing them.  Since I didn't know AJAX beyond what we had covered in class, I had to do some very thorough testing processes to make sure everything was right.  I set it up so two users can be online, both stored locally, and no more.  Having two users online is required to start the game.

The next step was working with the game API.  This was provided to us but we didn't create it.  This was probably my biggest challenge in the project because I'm not great at APIs yet.  Using the user API features as examples, I created a Create New Game feature, Get a Game feature, Show Wins feature, and created a background process in the New Game feature to sign in the second user as player o.  These features were difficult because I probably made them more complex than necessary, and ran into a lot of bugs.  It was very helpful to test them out in curl beforehand.

Finally, I worked on the game logic.  The game logic is just a programming challenge, which I have more experience with than APIs.  I created a function that could check any array to see if it was a winner, and I used that function for not only the game logic, but also the Get A Game and Show Your Wins features.  I also implemented Cheat Mode which was a bit easier than expected; it is just a function that uses jQuery to put CSS into cells that would win the game for the current player.

### Stretch Goals

Althought it is late, I still hope to try to get in a couple of stretch goals: to play on different devices using the html event handler on the game-api and playing on a smartphone.  I'm in the early stages of these challenges and probably won't complete them.

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
