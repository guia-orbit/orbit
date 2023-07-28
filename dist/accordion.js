(() => {
  // src/accordion.ts
  window["Orbit"] = window["Orbit"] || {};
  var Orbit = window["Orbit"];
  var Accordion = class {
    constructor() {
    }
    toggleItem(accordion) {
      let isOpen = accordion.classList.contains("is-open");
      let content = accordion.nextElementSibling;
      if (isOpen) {
        accordion.classList.remove("is-open");
        content.style.removeProperty("max-height");
        content.style.maxHeight = "auto";
      } else {
        accordion.classList.add("is-open");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    }
    init() {
      const accordionBtns = document.querySelectorAll("[wfu-ui-accordion=header]");
      accordionBtns.forEach((accordionItem) => {
        accordionItem.onclick = () => {
          this.toggleItem(accordionItem);
        };
      });
    }
  };
})();
//# sourceMappingURL=accordion.js.map
