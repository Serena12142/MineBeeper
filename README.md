# MineBeeper
Run server:
- download nodeJS
- npm install (automatically install packages in package.json)
- npm start (equivilent to the command node main.js)

Summary:
- A mine sweeping game designed for the visually impaired
- The game is guided by beeping sounds of different pitch that indicates the number of mines surrounding the selected cell
- Follows the ruls of traditional mine sweeping game (numbering, flagging, double click, ...)
- Programmed using NodeJS with express and socket.io modules
- The game is mostly client-side (all files in public folder) with the exception of leaderboard, which requires communication with the server (main.js and highscores.json)

