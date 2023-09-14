import {DomListener} from "./DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []
    this.prepare()
  }
  // Настройка компонента перед init
  prepare() {}
  // Возврат шаблон компонента
  toHTML() {
    return "";
  }
  // Уведовление слушателей о событии
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  // Падписка на событие
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }
  // Инициализация компонента, добавление слушателей
  init() {
    this.initDOMListeners()
  }
  // Удаление компонента, очистка слушателей
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
