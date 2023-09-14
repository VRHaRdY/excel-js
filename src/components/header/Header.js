import {ExcelComponent} from '../../core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options
    });
  }

  toHTML() {
    return `
          <input type="text" class="excel__title-input" value="Новая таблица" />
          <div class="excel__buttons">
            <div class="delete button">
              <span class="material-symbols-outlined"> delete </span>
            </div>
            <div class="exit button">
              <span class="material-symbols-outlined"> logout </span>
            </div>
          </div>
    `;
  }
}
