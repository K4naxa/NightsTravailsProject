const placeKnightBtn = document.querySelector(".placeKnightBtn");
const boardContainer = document.querySelector(".boardContainer");
const placeEndLocationBtn = document.querySelector(".PlaceEndLocationBtn");
const showRouteButton = document.querySelector(".showRouteButton");

let coordArray = [];

class BoardControls {
  constructor() {
    this.placingKnight = false;
    this.PlacingEnd = false;
  }
  createBoard() {
    for (let y = 7; y >= 0; y--) {
      for (let x = 0; x < 8; x++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        boardContainer.appendChild(cell);

        if ((x % 2 == 0 && y % 2 == 0) || (x % 2 != 0 && y % 2 != 0)) {
          cell.style.backgroundColor = "black";
          cell.style.color = "white";
        }
        coordArray.push({ x, y });
        cell.dataset.xCoord = x;
        cell.dataset.yCoord = y
        cell.addEventListener("click", (e) => {
          if (this.placingKnight) {
            knightPlacement(e);
          } else if (this.PlacingEnd) {
            endPlacement(e);
          }
        });
      }
    }
  }
}
const boardController = new BoardControls();
boardController.createBoard();

const knightPlacement = (e) => {
  const cells = boardContainer.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.classList.remove("knightPlacement");
  });

  knightLocation = [parseInt(e.target.dataset.xCoord),parseInt(e.target.dataset.yCoord)];
  e.target.classList.add("knightPlacement");
  boardController.placingKnight = false;
  console.log(knightLocation);
};

const endPlacement = (e) => {
  const cells = boardContainer.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.classList.remove("endPlacement");
  });

  endLocation = [parseInt(e.target.dataset.xCoord),parseInt(e.target.dataset.yCoord)]
  e.target.classList.add("endPlacement");
  boardController.PlacingEnd = false;
  console.log(endLocation);
};

// map to keep track of all visited sqares
const squareRegistry = new Map();
let knightLocation = [5, 0];
let endLocation = [2, 4];

// Obj for Squares
const chessSquare = (x, y) => {
  const xPosition = x;
  const yPosition = y;
  let predecessor;

  const KNIGHT_MOVES = [
    [-1, 2],
    [1, -2],
    [1, 2],
    [-1, -2],
    [2, 1],
    [-2, -1],
    [-2, 1],
    [2, -1],
  ];

  const getPredecessor = () => predecessor;
  const setPredecessor = (newPredecessor) => (predecessor = predecessor || newPredecessor);

  const name = () => `${x}, ${y}`;


  const possibleKnightMoves = () => {
    return KNIGHT_MOVES.map((offset) => newSquareFrom(offset[0], offset[1])).filter((square) => square !== undefined);
  };
  

  const newSquareFrom = (xOffSet, yOffSet) => {
    const [newX, newY] = [xPosition + xOffSet, yPosition + yOffSet];
    if (newX < 8 && newY < 8 && newX >= 0 && newY >= 0) {
      return chessSquare(newX, newY);
    }
  };

  if (squareRegistry.has(name())) {
    return squareRegistry.get(name());
  } else {
    const nSquare = { name, getPredecessor, setPredecessor, possibleKnightMoves };
    squareRegistry.set(name(), nSquare);
    return nSquare;
  }
};

const KnightTravels = (knightLocation, endLocation) => {
  squareRegistry.clear();

  const origin = chessSquare(...knightLocation);
  const target = chessSquare(...endLocation);

  // search for the target square while keeping track of predecessors
  const queue = [origin];
  while (!queue.includes(target)) {
    const currentSquare = queue.shift();

    const newQueue = currentSquare.possibleKnightMoves();
    newQueue.forEach((square) => {
      square.setPredecessor(currentSquare);
    });
    queue.push(...newQueue);
  }

  // Unravel the predecassors from the found route
  const route = [target];
  while (!route.includes(origin)) {
    const lastSquare = route[0].getPredecessor();
    route.unshift(lastSquare);
  }

  console.log(`Shortes found route was ${route.length - 1} jumps`);
  console.log("route was: ");
  route.forEach((square) => {
    console.log(square.name());
  });
};

placeKnightBtn.onclick = () => {
  boardController.placingKnight = true;
};
placeEndLocationBtn.onclick = () => {
  boardController.PlacingEnd = true;
};
showRouteButton.onclick = () => {
  KnightTravels(knightLocation, endLocation);
};
KnightTravels(knightLocation, endLocation)
console.log(knightLocation)