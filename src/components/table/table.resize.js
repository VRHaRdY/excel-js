import {$} from "../../core/dom";

export function resizeHandler($root, event) {
  return new Promise((resolve) => {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const startCoords = $parent.getCoords();
    const type = $resizer.data.resize;
    const sideProp = type === "column" ? "bottom" : "right";
    let delta;
    let value;

    $resizer.css({opacity: 1, [sideProp]: "-5000px"});

    document.onmousemove = (e) => {
      switch (type) {
        case "column":
          delta = e.pageX - startCoords.right;
          value = startCoords.width + delta;
          $resizer.css({right: -delta + "px"});
          break;
        case "row":
          delta = e.pageY - startCoords.bottom;
          value = startCoords.height + delta;
          $resizer.css({bottom: -delta + "px"});
          break;
      }
    };

    document.onmouseup = (e) => {
      switch (type) {
        case "column":
          $parent.css({width: value + "px"});
          $root
              .findAll(`[data-column="${$parent.data.column}"]`)
              .forEach((el) => {
                el.style.width = value + "px";
              });
          break;
        case "row":
          $parent.css({height: value + "px"});
          break;
      }

      resolve({
        value,
        type,
        id: $parent.data[type]
      })

      document.onmouseup = null;
      document.onmousemove = null;
      $resizer.css({opacity: 0, bottom: 0, right: 0});
    };
  });
}
