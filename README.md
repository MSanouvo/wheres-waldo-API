#Wimmel API

Our API for a Photo Tagging game akin to Where's Waldo (courtesy of The Odin Project).

This express server hosts the game images used by the client and connects the client to a database with all of the necessary game info (Maps, targets, scores, etc.). The routes are simple and will perform specific game actions based on what users do in the client. Here, we store the start/end time of the current game and compare their input to the database to provide feedback on the user's actions. As users keep calling our "/target" route and successfully find all the provided targets, the server will automatically push the "/game-over" route to send the total game time and allow them to input their name and score for the leaderboard.

While simple in execution, I spent a good amount of time practicing how to test my routes with supertest. This helped me think about what I wanted my functions to do in the beginning (tests currently outdated due to some changes during development). Originally, I added more dependencies like the SupaBase API to store the images provided for the game, then realized that it wasn't needed for a project with this small of a scope. This realization caused me to look into keeping the files locally in the project folders and serving them when the server was up. Previous projects I have done involved creating a lot of different routes and working on CRUD methods for user actions, so something a bit simpler like this let me focus more on express fundamental.

Possible Improvements:
- Adding more maps/larget target lists
- incorporating express session to remember users (maybe show all of a user's scores in the leaderboard)

<a href="https://github.com/MSanouvo/Wimmel">Link to frontend Client</a>

Image Credit: Cruise, illustrated by Anders Lyon