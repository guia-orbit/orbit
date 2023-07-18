(() => {
  // src/accordion.ts
  window["Orbit"] = window["Orbit"] || {};
  var Orbit = window["Orbit"];
  var Accordion = class {
    constructor() {
    }
    init() {
      const accordionBtns = document.querySelectorAll("[wfu-ui-accordion=header]");
      accordionBtns.forEach((accordion) => {
        accordion.onclick = function() {
          accordion.classList.toggle("is-open");
          let content = accordion.nextElementSibling;
          console.log(content);
          if (content.style.maxHeight) {
            content.style.maxHeight = "auto";
          } else {
            content.style.maxHeight = content.scrollHeight + "px";
            console.log(content.style.maxHeight);
          }
        };
      });
    }
  };
})();
//# sourceMappingURL=accordion.js.map
