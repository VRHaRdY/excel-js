import {ExcelComponent} from "../../core/ExcelComponent";
import {$} from "../../core/dom";
import {TableSelection} from "./TableSelection";
import {isCell, matrix, shouldRezize, nextSelector} from "./table.functions";
import {resizeHandler} from "./table.resize";
import {createTable} from "./table.template";

export class Table extends ExcelComponent {
  static className = "excel__table";
  static tableSize = 20;

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ["mousedown", "mouseup", "keydown", "input"],
      ...options
    });
  }

  toHTML() {
    return createTable(Table.tableSize);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    this.selectCell(this.$root.find(`[data-id="0:0"]`))
    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })
    this.$on('formula:enter', () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell)
  }

  onMousedown(event) {
    if (shouldRezize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onMouseup(event) {
    // console.log("Muse UP ", event.target)
  }

  onKeydown(event) {
    const keys = [
      "Enter",
      "Tab",
      "ArrowDown",
      "ArrowUp",
      "ArrowLeft",
      "ArrowRight"
    ]

    const {key} = event

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  onInput(event) {
    this.emitter.emit('table:input', $(event.target))
  }
}
