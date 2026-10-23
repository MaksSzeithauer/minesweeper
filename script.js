function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

const board = [];
for(let i = 0;i<81;i++){
  board.push(0);
}
const bombs = [];
while(bombs.length<10){
  let position = getRndInteger(0,81);
  if (!bombs.includes(position)){
    bombs.push(position);
  } 
}

console.log(bombs);
for (let bomb of bombs){
  board[bomb] = 9;
}

let bomb_idx;

for(let b = 0; b<10; b++){
  for(let i =-1; i<2; i++){
    for(let j=-1; j<2; j++){
      if( bombs[b]%9==0 && i==-1){
        continue;
      }else if (bombs[b]%9==8 && i==1){
        continue;
      }else{
        bomb_idx = bombs[b] + j*9 + i;
      }
      if (0<bomb_idx && bomb_idx<81){
        if (board[bomb_idx] != 9){
          board[bomb_idx] += 1;
        }
      } 
    }
  }
}
console.log(board);