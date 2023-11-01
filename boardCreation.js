const boardContainer = document.querySelector(".boardContainer");

function createBoard() {
  for (let y = 7; y >= 0; y--) {
    for (let x = 0; x < 8; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      boardContainer.appendChild(cell);
      cell.innerHTML = `${x}, ${y}`;

      if ((x % 2 == 0 && y % 2 == 0) || (x % 2 != 0 && y % 2 != 0)) {
        cell.style.backgroundColor = "black";
        cell.style.color = "white";
      }
    }
  }
}

export default createBoard;
