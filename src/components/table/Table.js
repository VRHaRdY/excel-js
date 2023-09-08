import {ExcelComponent} from "../../core/ExcelComponent";
import {shouldRezize} from "./table.functions";
import {resizeHandler} from "./table.resize";
import {createTable} from "./table.template";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root) {
    super($root, {
      name: "Table",
      listeners: ["mousedown"],
    });
  }

  toHTML() {
    return createTable(20);
  }

  onMousedown(event) {
    if (shouldRezize(event)) {
      resizeHandler(this.$root, event)
    }
  }
}
