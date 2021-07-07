module.exports = function solveSudoku(matrix) {
  //Найти уникальный возможный элемент среди возможный в строке, в столбце или ячейке и забисать его.
  let result = stepMatrix(matrix);
  console.log(result);
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
  let countEdit = 0;
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
    if(possibleValues.length === 1) {
      matrix[nullObj.y][nullObj.x] = possibleValues[0];
      countEdit++;
    }
    else {
      nullStore[index].possibleValues = possibleValues;
      nullStore[index].sectionId = get3x3Id(nullObj.x, nullObj.y)
    }
  });
  nullStore = nullStore.filter(nullObj => nullObj.possibleValues);
  if(countEdit) matrix = stepMatrix(matrix);
  else matrix = setUniqPossValue(matrix, nullStore);
  return matrix;
}

function setUniqPossValue(matrix, nullStore) {
  let countEdit = 0;
  for(let nullItem of nullStore) {
    for(let value of nullItem.possibleValues) {
      //Находим все возможные значения в линии
      let allPossValueInLine = nullStore.filter(nullObj => nullObj.x === nullItem.x);
      allPossValueInLine = allPossValueInLine.reduce((res, el) => {res.push(el.possibleValues); return res}, []).flat();
      const countValueInLine = allPossValueInLine.filter(el => el === value).length;
      if(countValueInLine === 1) {
        matrix[nullItem.y][nullItem.x] = value;
        countEdit++;
        break;
      }
      //Находим все возможные значения в колонке
      let allPossValueInCollumn = nullStore.filter(nullObj => nullObj.y === nullItem.y);
      allPossValueInCollumn = allPossValueInCollumn.reduce((res, el) => {res.push(el.possibleValues); return res}, []).flat();
      const countValueInCollumn = allPossValueInCollumn.filter(el => el === value).length;
      if(countValueInCollumn === 1) {
        matrix[nullItem.y][nullItem.x] = value;
        countEdit++;
        break;
      }
      //Находим все возможные значения в секции
      let allPossValueInSection = nullStore.filter(nullObj => nullObj.sectionId === nullItem.sectionId);
      allPossValueInSection = allPossValueInSection.reduce((res, el) => {res.push(el.possibleValues); return res}, []).flat();
      const countValueInSection = allPossValueInSection.filter(el => el === value).length;
      if(countValueInSection === 1) {
        matrix[nullItem.y][nullItem.x] = value;
        countEdit++;
        break;
      }
    }
  }
  if(countEdit) matrix = stepMatrix(matrix);
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

function get3x3Id(x, y) {
  if(x < 3 && y < 3) return 1;
  else if(x < 6 && y < 3) return 2;
  else if(x < 9 && y < 3) return 3;
  if(x < 3 && y < 6) return 4;
  else if(x < 6 && y < 6) return 5;
  else if(x < 9 && y < 6) return 6;
  if(x < 3 && y < 9) return 7;
  else if(x < 6 && y < 9) return 8;
  else if(x < 9 && y < 9) return 9;
}