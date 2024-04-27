# Battleship-js
This is a project that is a recreation of the Battleship game, which is based on organizing your fleet and destroying the rival fleet.
### Rules
- Each ship must have a separation of one square in all directions.
- In each player's turn, a shot must be fired at the opponent's board. If the shot hits, they can continue attacking until they miss.
- The first player to destroy all the opponent's ships wins.
### Features
- There is an organization phase, in which the player can move and manipulate his ships to his liking:
  - If the boat is **Dragged** the first upper left box is taken as a reference, if moving to an illegal place the boat is returned to its initial place.
  - If you **Click** the Ship changes direction, taking the selected box as the reference point of origin.
- To continue to the next phase you must **Confirm**.
- You can view the Rival board, so you can attack it following the rules.
- The game ends when one of the players has no ships and a new game can be started.