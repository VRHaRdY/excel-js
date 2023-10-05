import {defaultTitle} from '../../constants';
import {ExcelComponent} from '../../core/ExcelComponent';
import {$} from '../../core/dom';
import {ActiveRoute} from '../../core/routes/ActiveRoute';
import {debounce} from '../../core/utils';
import {changeTitle} from "../../redux/actions"

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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
            <div class="delete button" data-button="remove">
              <span
                class="material-symbols-outlined"
                data-button="remove">
                  delete
                </span>
            </div>
            <div class="exit button" data-button="exit">
              <span
                class="material-symbols-outlined"
                data-button="exit">
                  logout
                </span>
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

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.button === 'remove') {
      const decision = confirm('Вы точно хотите удалить текущую таблицу?')
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }
}
