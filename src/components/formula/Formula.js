import {ExcelComponent} from "../../core/ExcelComponent";

export class Formula extends ExcelComponent {
  static className = "excel__formula";

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click', 'mousedown']
    });
  }

  toHTML() {
    return `
          <div class="formula-info">fx</div>
          <div class="formula-input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(event) {
    console.log('Formula onInput', event.target.textContent.trim())
  }

  onClick(event) {
    console.log('Formula onClick', event.target.textContent.trim())
  }

  onMousedown(event) {
    console.log('Formula onMD', event.target.textContent.trim())
  }
}
