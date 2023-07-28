(() => {
  // src/whatsapp.ts
  var WhatsApp = class {
    constructor() {
    }
    init() {
      let title = document.title;
      let url = window.location.href;
      let elements = document.querySelectorAll("[data-share-whatsapp]");
      elements.forEach((element) => {
        element.setAttribute("href", "https://wa.me/?text=" + url + "?utm_source=siteshare");
        element.setAttribute("target", "_blank");
      });
    }
  };
})();
//# sourceMappingURL=whatsapp.js.map
