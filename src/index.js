module.exports = function solveSudoku(matrix) {
  //Функция нахождения нуля
  function findNull(matrix) {
    for(let y = 0; y < 9; y++) {
      for(let x = 0; x < 9; x++) {
        if(matrix[y][x] === 0) {
          return [x, y];
        }
      }
    }
    return null;
  }

  function getCollumn(matrix, x) {
    let result = [];
    matrix.forEach(row => {
      result.push(row[x])
    });
    return result;
  }

  function getSection(matrix, x, y) {
    const startX = Math.floor(x / 3) * 3;
    const startY = Math.floor(y / 3) * 3;
    const result = [];
    for(let y = startY; y < startY + 3; y++) {
      for(let x = startX; x < startX + 3; x++) {
        result.push(matrix[y][x]);
      }
    }
    return result;
  }

  function isValid(matrix, currentPos, currentElem) {
    const [x, y] = currentPos;
    const row = matrix[y];
    const col = getCollumn(matrix, x);
    const section = getSection(matrix, x, y);
    if(row.includes(currentElem) || col.includes(currentElem) || section.includes(currentElem)){
      return false;
    }
    return true;
  }

  function solve() {
    const currentPos = findNull(matrix);
    if(currentPos === null) return true;
    const [x, y] = currentPos;
    for(let i = 1; i < 10; i++) {
      if(isValid(matrix, currentPos, i)) {
        const [x, y] = currentPos;
        matrix[y][x] = i;
        if(solve()) return true;
        matrix[y][x] = 0;
      }
    }
    return false;
  }
  solve();
  console.log(matrix);
  return matrix;
}



