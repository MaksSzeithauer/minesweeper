function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

let ROWS = 16;
let COLUMNS = 30;
let TILES = ROWS*COLUMNS;
let BOMBS = 99;

const board = [];
for(let i = 0;i<TILES;i++){
  board.push(0);
}
const bombs = [];
while(bombs.length<BOMBS){
  let position = getRndInteger(0,TILES);
  if (!bombs.includes(position)){
    bombs.push(position);
  } 
}

console.log(bombs);
for (let bomb of bombs){
  board[bomb] = 9;
}

let bomb_idx;

for(let b = 0; b<BOMBS; b++){
  for(let i =-1; i<2; i++){
    for(let j=-1; j<2; j++){
      if( bombs[b]%COLUMNS==0 && i==-1){
        continue;
      }else if (bombs[b]%COLUMNS==COLUMNS-1 && i==1){
        continue;
      }else{
        bomb_idx = bombs[b] + j*COLUMNS + i;
      }
      if (0<=bomb_idx && bomb_idx<TILES){
        if (board[bomb_idx] != 9){
          board[bomb_idx] += 1;
        }
      } 
    }
  }
}

const boardEl = document.getElementById("board");
boardEl.style.gridTemplateColumns = `repeat(${COLUMNS}, 40px)`;

for (let i = 0; i < TILES; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");

  if(board[i]==9){
    cell.textContent = "9"
  }
  else if(board[i]>0){
    cell.textContent = board[i];
  }
  cell.classList.add("n" + board[i]);
  boardEl.appendChild(cell);
}