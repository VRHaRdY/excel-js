const CODES = {
  A: 65,
  Z: 90,
};

function toCell(data) {
  return `
    <div class="cell" contenteditable>

    </div>
  `;
}

function toColumn(column) {
  return `
    <div class="column">
      ${column}
    </div>
  `;
}

function createRow(index, content) {
  return `<div class="row">
    <div class="row-info">${index ? index : ""}</div>
    <div class="row-data">${content}</div>
  </div>`;
}

function toChar(el, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  const columnsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const columns = new Array(columnsCount)
      .fill("")
      .map(toChar)
      .map(toColumn)
      .join("");

  // Первая строка (шапка таблицы)
  rows.push(createRow("", columns));

  // Остальные строки
  for (let i = 0; i < rowsCount; i++) {
    const cellsData = new Array(columnsCount)
        .fill("")
        .map(toCell)
        .join("");
    rows.push(createRow(i + 1, cellsData));
  }
  return rows.join("");
}
