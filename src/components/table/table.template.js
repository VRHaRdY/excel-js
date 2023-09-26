import {toInlineStyles} from "../../core/utils";
import {defaultStyles} from "../../constants"
import {parse} from "../../core/parse";

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 30

function toCell(state, row) {
  return function(_, column) {
    const id = `${row}:${column}`
    const width = getWidth(state.columnState, column)
    const data = state.dataState[id]
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    })
    return `<div class="cell"
    data-row="${row}"
    data-column="${column}"
    data-id="${id}"
    data-type="cell"
    data-value="${data || ''}"
    contenteditable
    style="${styles}; width: ${width}"
    >
    ${parse(data) || ''}
    </div>`;
  };
}

function toColumn({column, index, width}) {
  return `
    <div class="column" data-column="${index}" data-type="resizable"
    style="width: ${width}">
      ${column}
      <div class="column-resize" data-resize="column"></div>
    </div>
  `;
}

function createRow(state, index, content) {
  const resizer = index
    ? `<div class="row-resize" data-resize="row"></div>`
    : "";
  return `
  <div class="row"
  data-type="resizable"
  data-row="${index}"
  style="height: ${getHeight(state, index)}">
    <div class="row-info">
      ${index ? index : ""}
      ${resizer}
    </div>
    <div class="row-data">${content}</div>
  </div>
  `;
}

function toChar(el, index) {
  return String.fromCharCode(CODES.A + index);
}

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function withWidthFrom(state) {
  return function(column, index) {
    return {
      column, index, width: getWidth(state.columnState, index)
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const columnsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const columns = new Array(columnsCount)
      .fill("")
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join("");

  rows.push(createRow({}, "", columns));
  for (let row = 0; row < rowsCount; row++) {
    const cellsData = new Array(columnsCount)
        .fill("")
        .map(toCell(state, row))
        .join("");
    rows.push(createRow(state.rowState, row + 1, cellsData));
  }
  return rows.join("");
}
