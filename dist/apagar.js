(() => {
  // src/apagar.ts
  var Apagar = class {
    constructor() {
    }
    init() {
      const elements = document.querySelectorAll("[fs-cmsfilter-reset=data]");
      elements.forEach((element) => {
        element.addEventListener("click", function() {
          const dateElement = document.getElementById("date");
          const fp = dateElement?._flatpickr;
          if (fp) {
            fp.clear();
          }
        });
      });
    }
  };
})();
//# sourceMappingURL=apagar.js.map
