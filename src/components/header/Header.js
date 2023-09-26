import {defaultTitle} from '../../constants';
import {ExcelComponent} from '../../core/ExcelComponent';
import {$} from '../../core/dom';
import {debounce} from '../../core/utils';
import {changeTitle} from "../../redux/actions"

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
          <input type="text" class="excel__title-input" value="${title}" />
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

  onInput(event) {
    const $tableName = $(event.target)
    this.$dispatch(changeTitle(
        $tableName.text()
    ))
  }
}
