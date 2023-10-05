import {storage} from "../core/utils";

function toHtml(key) {
  const tableInfo = storage(key)
  const tableId = key.split(':')[1]
  return `
    <li class="dashboard__record">
      <a href="#excel/${tableId}">${tableInfo.title}</a>
      <strong>
        ${new Date(tableInfo.openedDate).toLocaleDateString()}
        ${new Date(tableInfo.openedDate).toLocaleTimeString()}
      </strong>
    </li>
  `;
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()
  if (!keys.length) {
    return '<p>Вы пока не создали ни одной таблицы</p>'
  }

  return `
    <div class="dashboard__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>
    <ul class="dashboard__list">
      ${keys.map(toHtml).join('')}
    </ul>
  `
}