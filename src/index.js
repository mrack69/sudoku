module.exports = function solveSudoku(matrix) {
  //Найти уникальный возможный элемент среди возможный в строке, в столбце или ячейке и забисать его.
  let result = stepMatrix(matrix);
  return result;
}

function stepMatrix(matrix) {
  let nullStore = [];
  matrix.forEach((line, i) => {
    line.forEach((el, index) => {
      if (el === 0) nullStore.push({
        x: index,
        y: i,
      });
    });
  });
  //Найти возможные значения для строки, для столбца, для 3х3 а потом положить в объект пересечение 3 массивов.
  nullStore.forEach((nullObj, index) => {
    const possibleValuesInRow = [];
    const possibleValuesInCol = [];
    const possibleValuesIn3x3 = [];
    const row = getRow(matrix, nullObj.y);
    const col = getCol(matrix, nullObj.x);
    const this3x3 = get3x3(matrix, nullObj.x, nullObj.y)
    for (let i = 1; i < 10; i++) {
      if (!row.includes(i)) possibleValuesInRow.push(i);
      if (!col.includes(i)) possibleValuesInCol.push(i);
      if (!this3x3.includes(i)) possibleValuesIn3x3.push(i);
    }
    let possibleValues = possibleValuesInRow.filter(x => possibleValuesInCol.includes(x)).filter(x => possibleValuesIn3x3.includes(x));
    if(possibleValues.length === 1) matrix[nullObj.y][nullObj.x] = possibleValues[0];
    else nullStore[index].possibleValues = possibleValues;
  });
  nullStore = nullStore.filter(nullObj => nullObj.possibleValues);
  console.log(nullStore);
  return matrix;
}

function getRow(matrix, y) {
  return matrix[y];
}

function getCol(matrix, x) {
  const col = [];
  matrix.forEach(line => col.push(line[x]));
  return col;
}

function get3x3(matrix, x, y) {
  const result =[];
  let lineXx3;
  let lineYx3;
  if (x < 3) lineXx3 = 0;
  else if (x < 6) lineXx3 = 3;
  else lineXx3 = 6;
  if (y < 3) lineYx3 = 0;
  else if (y < 6) lineYx3 = 3;
  else lineYx3 = 6;
  const lines = matrix.slice(lineYx3, lineYx3 + 3);
  lines.forEach(line => result.push(line.slice(lineXx3, lineXx3 + 3)));
  return result.flat();
}