(() => {
  // src/gratis.ts
  var PRICE_GRATIS = "0.01";
  var Gratis = class {
    constructor() {
    }
    init() {
      let button = document.getElementById("gratis-button");
      button.addEventListener("click", () => {
        let rangeSliderInput = document.querySelector("input.rangeslider_input");
        if (rangeSliderInput)
          rangeSliderInput.value = PRICE_GRATIS;
        let rangeSliderHandle = document.querySelector("div[fs-rangeslider-element=handle]");
        if (rangeSliderHandle) {
          rangeSliderHandle.setAttribute("aria-valuenow", PRICE_GRATIS);
          rangeSliderHandle.style.left = "0px";
        }
        let rangeSliderFill = document.querySelector("div[fs-rangeslider-element=fill]");
        if (rangeSliderFill) {
          rangeSliderFill.style.width = "0px";
        }
        let rangeSliderDisplayValue = document.querySelector("[fs-rangeslider-element=display-value]");
        if (rangeSliderDisplayValue) {
          rangeSliderDisplayValue.innerText = PRICE_GRATIS;
        }
        rangeSliderInput?.dispatchEvent(new Event(
          "input",
          { bubbles: true }
        ));
        let container = document.getElementById("content-filter");
        if (container)
          container.scrollIntoView({ behavior: "smooth" });
      });
    }
  };
})();
//# sourceMappingURL=gratis.js.map
