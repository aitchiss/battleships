# battleships

The task has been completed using JavaScript React, node express server, and socket.io for the feeding of information between the two sessions.
Models have been tested using Mocha.

### Set-up

Please give the start.sh file permission to run in terminal, and run the file. This should install necessary npm node modules and start the server.
Once the server has started, please open two browser windows of localhost:3000 (player one and player two).

### Requirement 1: Build a board

I have used a Board model, which creates a simple array of rows (also arrays). Each position in the row array is occupied by one of the following:
- '' - square is empty
- 'x' - square is full
- '?' - square is unknown (i.e. on tracking board only)

The board is created by passing in the required number of squares and optionally specifying a non-standard board type (i.e. 'tracking' to indicate tracking board).

The board has a function to mark a square as full.

### Requirement 2: Tracking board

Each player has a tracking board, created using the Board model. The Board model populates each square with a value of '?' (unknown) on creation, when 'tracking' board type is specified.

The GameContainer function "handleTrackingSquareClick" emits an event using socket to indicate the player has taken a shot.
When a 'shotTaken' event is emitted from the socket, the GameContainer calls function "processShot" which checks the value of the square which has been hit, and emits a further event via socket confirming the content of the square.
When a 'shotResponse' event is emitted from the socket, the GameConatiner calls function "receiveShotResponse" to update its state based on the value of the square targeted.

### Requirement 3: Validate layout

The GameContainer initializes with a state including an array of ship sizes which need to placed.
A series of instructions guides the player to place each ship in turn, confirming their submission with a button click.

Marking a square as a 'ship' square is handled by GameContainer function "handlePrimaryBoardClick"
A ship is only fully placed once the user clicks the confirm button, the event for which is handled by "placeShipHandler"

On click, a new instance of the PlacementValidator model is created and used to check that:
- the ship is in either a single row, or a single column
- the ship is in consecutive squares

The GameContainer state tracks how many squares are occupied by confirmed ships. This information is used alongside the Board model's "getNumOfOccupiedSquares" function to check that the ship being placed is independent of, and does not overlap with other ships.

A user is able to reverse their decision to place a ship in a square at any time before the 'confirm' button is clicked. Once a ship is confirmed, it cannot be changed.

Once a board is valid and all ships have been placed, the GameContainer "readyToPlay" status is updated, and the opposing player receives a socket emit to confirm this.
Once both players are ready to play, the game begins.

### Requirement 4: Determine winner

Turns are alternated by updating the GameContainer state each time a shot is taken, and text is displayed below the primary/tracking boards to indicate current state of play. The GameContainer state tracks how many successful shots have been fired, and once this reaches 17, the socket emits a "win" event to end the game.


