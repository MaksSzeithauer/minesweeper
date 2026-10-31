function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

let ROWS = 9;
let COLUMNS = 9;
let TILES = ROWS*COLUMNS;
let BOMBS = 10;

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
for(let r = 0; r <ROWS ;r++){
console.log(board.slice(COLUMNS*r,COLUMNS*(r+1)).join(" "));
}
