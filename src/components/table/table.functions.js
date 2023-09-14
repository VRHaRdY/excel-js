import {range} from "../../core/utils";
import {Table} from "./Table";

export function shouldRezize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type === "cell";
}

export function matrix($target, $current) {
  const target = $target.id(true)
  const current = $current.id(true)
  const cols = range(current.column, target.column);
  const rows = range(current.row, target.row);

  return cols.reduce((acc, column) => {
    rows.forEach((row) => acc.push(`${row}:${column}`));
    return acc;
  }, []);
}

export function nextSelector(key, {column, row}) {
  const MIN_VALUE = 0
  switch (key) {
    case "Enter":
    case "ArrowDown":
      if (row < Table.tableSize - 1) {
        row++
      }
      break;
    case "ArrowUp":
      row > MIN_VALUE ? row-- : MIN_VALUE
      break;
    case "ArrowLeft":
      column > MIN_VALUE ? column-- : MIN_VALUE
      break;
    case "Tab":
    case "ArrowRight":
      if (column < 25) {
        column++
      }
      break;
  }

  return `[data-id="${row}:${column}"]`
}
