import {ExcelComponent} from "../../core/ExcelComponent";
import {$} from "../../core/dom";
import {TableSelection} from "./TableSelection";
import {isCell, matrix, shouldRezize, nextSelector} from "./table.functions";
import {resizeHandler} from "./table.resize";
import {createTable} from "./table.template";
import * as actions from "../../redux/actions"
import {defaultStyles} from "../../constants";
import {parse} from "../../core/parse";

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
    return createTable(Table.tableSize, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    this.selectCell(this.$root.find(`[data-id="0:0"]`))

    this.$on('formula:input', value => {
      this.selection.current
          .attr('data-value', value)
          .text(parse(value))
      this.updateTextInStore(value)
    })

    this.$on('formula:enter', () => {
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle', (value) => {
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds
      }))
    })
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    console.log('styles to dispatch', styles)
    this.$dispatch(actions.changeStyles(styles))
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data))
    } catch (error) {
      console.warn("Resize Error", error.message)
    }
  }

  onMousedown(event) {
    if (shouldRezize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
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

  updateTextInStore(value) {
    console.log('xxx', this.selection)
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(event) {
    // this.emitter.emit('table:input', $(event.target))
    this.updateTextInStore($(event.target).text())
  }
}
