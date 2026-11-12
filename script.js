function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function neighbors(index) {
  const result = [];

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (i == 0 && j == 0) {
        continue;
      }
      if (index % COLUMNS == 0 && i == -1) {
        continue;
      } else if (index % COLUMNS == COLUMNS - 1 && i == 1) {
        continue;
      }

      const n = index + j * COLUMNS + i;
      if (0 <= n && n < TILES) {
        result.push(n);
      }
    }
  }
  return result;
}

let ROWS = 16;
let COLUMNS = 30;
let TILES = ROWS*COLUMNS;
let BOMBS = 99;

const board = new Array(TILES).fill(0);
const bombs = [];
while(bombs.length<BOMBS){
  let position = getRndInteger(0,TILES);
  if (!bombs.includes(position)){
    bombs.push(position);
  } 
}

for (let bomb of bombs){
  board[bomb] = 9;
}

for (const bomb of bombs) {
  for (const n of neighbors(bomb)) {
    if (board[n] != 9) {
      board[n] += 1;
    }
  }
}

const boardEl = document.getElementById("board");
boardEl.style.gridTemplateColumns = `repeat(${COLUMNS}, var(--tile-size))`;

const tiles = [];
const revealed = new Array(TILES).fill(false);
const flagged = new Array(TILES).fill(false);
let revealedCount = 0;
let gameOver = false;

for (let i = 0; i < TILES; i++) {
  const tile = document.createElement("div");
  tile.classList.add("tile");

  tile.addEventListener("click", function () {
    reveal(i);
  });

  tile.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    toggleFlag(i);
  });

  boardEl.appendChild(tile);
  tiles.push(tile);
}


function showTile(i) {
  revealed[i] = true;
  revealedCount++;

  const tile = tiles[i];
  tile.classList.add("revealed");

  if (board[i] > 0 && board[i] < 9) {
    tile.textContent = board[i];
    tile.classList.add("n" + board[i]);
  }
}

function revealTile(i) {
  if (revealed[i] || flagged[i]) return false;

  if (board[i] === 9) {
    tiles[i].classList.add("bomb");
    return true;
  }

  const stack = [i];
  while (stack.length > 0) {
    const current = stack.pop();
    if (revealed[current] || flagged[current]) continue;

    showTile(current);

    if (board[current] === 0) {
      for (const n of neighbors(current)) {
        if (!revealed[n]) {
          stack.push(n);
        }
      }
    }
  }
  return false;
}

function lose() {
  gameOver = true;
  revealAllBombs();
  setTimeout(function () {
    alert("Przegrałeś!");
  }, 50);
}

function reveal(i) {
  if (gameOver || flagged[i]) return;

  if (revealed[i]) {
    chord(i);
    return;
  }

  if (revealTile(i)) {
    lose();
    return;
  }
  checkWin();
}

function chord(i) {
  if (board[i] === 0 || board[i] === 9) return;

  const around = neighbors(i);

  let flagCount = 0;
  for (const n of around) {
    if (flagged[n]) flagCount++;
  }

  if (flagCount !== board[i]) return;

  let hitBomb = false;
  for (const n of around) {
    if (!flagged[n] && !revealed[n]) {
      if (revealTile(n)) {
        hitBomb = true;
      }
    }
  }

  if (hitBomb) {
    lose();
  } else {
    checkWin();
  }
}

function toggleFlag(i) {
  if (gameOver || revealed[i]) return;

  flagged[i] = !flagged[i];
  tiles[i].classList.toggle("flag", flagged[i]);
}

function revealAllBombs() {
  for (const b of bombs) {
    tiles[b].classList.add("revealed", "mine");
  }
}

function checkWin() {   
  if (revealedCount === TILES - BOMBS) {
    gameOver = true;
    setTimeout(function () {
      alert("Wygrałeś!");
    }, 50);
  }
}