(() => {
  // src/fstest.ts
  window["Orbit"] = window["Orbit"] || {};
  var Orbit = window["Orbit"];
  var FSTest = class {
    constructor() {
    }
    init() {
      window["fsAttributes"] = window["fsAttributes"] || [];
      window["fsAttributes"].push([
        "cmsload",
        (listInstances) => {
          console.log("cmsload Successfully loaded!");
          const [listInstance] = listInstances;
          console.log(listInstance);
          if (!listInstance)
            return;
          console.log("cms lists", listInstances?.length);
          console.log("cms items in list", listInstance?.items?.length);
          if (listInstance && listInstance.items) {
            console.log("item", listInstance?.items[0]);
            console.log("item", listInstance?.items[1]);
          }
          listInstance.on("renderitems", (renderedItems) => {
            console.log("cmsload", renderedItems);
          });
          listInstance.on("additems", (addedItems) => {
            console.log("cmsload", "The following items have been added to the CMSList memory: ", addedItems);
          });
          console.log("GO BABY GO!!");
        }
      ]);
      window["fsAttributes"] = window["fsAttributes"] || [];
      window["fsAttributes"].push([
        "cmsfilter",
        (filterInstances) => {
          console.log("cmsfilter Successfully loaded!");
          const [filterInstance] = filterInstances;
          console.log(filterInstance);
          if (!filterInstance)
            return;
          console.log("cms items in list", filterInstance.listInstance?.items?.length);
          filterInstance.listInstance.on("renderitems", (renderedItems) => {
            console.log("cmsfilter", renderedItems);
          });
          filterInstance.listInstance.on("additems", (addedItems) => {
            console.log("cmsfilter", "The following items have been added to the CMSList memory: ", addedItems);
          });
          filterInstance.listInstance.on("switchpage", (targetPage) => {
            console.log("cmsfilter", "switchpage event", "The user has navigated to the page number ", targetPage);
          });
        }
      ]);
    }
  };
})();
//# sourceMappingURL=fstest.js.map
