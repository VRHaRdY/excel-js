export class TableSelection {
  static className = "selected"

  constructor() {
    this.group = []
    this.current = null
  }

  select($el) {
    this.unselect()
    $el.focus().addClass(TableSelection.className)
    this.group.push($el)
    this.current = $el
  }

  selectGroup($group = []) {
    this.unselect()
    this.group = $group
    this.group.forEach(($el) => {
      $el.addClass(TableSelection.className)
    })
  }

  unselect() {
    this.group.forEach($el => {
      $el.removeClass(TableSelection.className)
    })
    this.group = []
  }
}