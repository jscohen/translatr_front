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

The game functions via a log that shows every action the users take and displays warnings, issues and victory messages.  The log is inserted via jQuery into an empty <span> element inside an <h3> element.

## Project Planning

I planned for this project by creating some simple wireframes for the front page and by mapping out the game logic visually on paper.  The final product turned out to be quite different than the wireframes, which are admittedly not my area of expertise.  The visuals were generally the same, but the game logic turned out to be more complex than I had expected.

[Wireframe](http://i.imgur.com/vfEc5af.jpg)
[Game logic mock-up](http://i.imgur.com/NGiAYz8.jpg)
