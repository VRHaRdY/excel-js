const CODES = {
  A: 65,
  Z: 90,
};

// function toCell(column, row) {
//   return `
//     <div class="cell"
//     data-row="${row}"
//     data-column="${column}"
//     contenteditable>
//     </div>
//   `;
// }

function toCell(row) {
  return function(_, column) {
    return `<div class="cell"
    data-row="${row}"
    data-column="${column}"
    data-id="${row}:${column}"
    data-type="cell"
    contenteditable>
    </div>`;
  };
}

function toColumn(column, index) {
  return `
    <div class="column" data-column="${index}" data-type="resizable">
      ${column}
      <div class="column-resize" data-resize="column"></div>
    </div>
  `;
}

function createRow(index, content) {
  const resizer = index
    ? `<div class="row-resize" data-resize="row"></div>`
    : "";
  return `<div class="row" data-type="resizable">
    <div class="row-info">
      ${index ? index : ""}
      ${resizer}
    </div>
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

  rows.push(createRow("", columns));

  for (let row = 0; row < rowsCount; row++) {
    const cellsData = new Array(columnsCount)
        .fill("")
        // .map((_, column) => toCell(row, column))
        .map(toCell(row))
        .join("");
    rows.push(createRow(row + 1, cellsData));
  }
  return rows.join("");
}
