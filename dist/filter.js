(() => {
  // src/filter.ts
  window["Orbit"] = window["Orbit"] || {};
  var Orbit = window["Orbit"];
  var DateFilter = class {
    constructor() {
      this.fsCmsFilterField = "data";
    }
    parseDate(dateString) {
      let [day, month, year] = dateString.split(/\/|-/).map(Number);
      let d = new Date(Date.UTC(year, month - 1, day));
      return d;
    }
    getDatesList(text) {
      var data = text;
      if (!data)
        return null;
      let dateString = data;
      let dateStringArray = dateString.split(/[\s,]+/);
      let dateArray = dateStringArray.map((date) => {
        let d = this.parseDate(date);
        if (isNaN(d.getTime()))
          console.error("invalid date", date);
        return d;
      });
      dateArray[0];
      return dateArray;
    }
    getDatesByWeekdays(start, end, weekdayNames) {
      const weekdays = weekdayNames.split(/[\s,]+/);
      const weekdayToNumber = {
        "seg": 1,
        "ter": 2,
        "qua": 3,
        "qui": 4,
        "sex": 5,
        "sab": 6,
        "dom": 0
      };
      const dates = [];
      let currentDate = new Date(start.getTime());
      while (currentDate <= end) {
        if (weekdays.includes(Object.keys(weekdayToNumber)[currentDate.getDay()])) {
          dates.push(new Date(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    }
    createFilterRangeHtml(dateStart, dateEnd) {
      let isoDateStart = dateStart.toISOString().split("T")[0] + "T00:00:00+00:00";
      let isoDateEnd = dateEnd.toISOString().split("T")[0] + "T00:00:00+00:00";
      let html = ``;
      if (dateStart.getTime() == dateEnd.getTime()) {
        html = `<li>Exact: <span fs-cmsfilter-field="${this.fsCmsFilterField}" fs-cmsfilter-type="date">${isoDateStart}</span></li>`;
      } else {
        html = `<li>From: <span fs-cmsfilter-field="${this.fsCmsFilterField}" fs-cmsfilter-type="date" fs-cmsfilter-range="from">${isoDateStart}</span></li><li>To: <span fs-cmsfilter-field="${this.fsCmsFilterField}" fs-cmsfilter-type="date" fs-cmsfilter-range="to">${isoDateEnd}</span></li>`;
      }
      html = `<div filter-data><ul>${html}</li></div>`;
      return html;
    }
    validDateArray(dateArray) {
      return dateArray.filter((d) => !isNaN(d.getTime()));
    }
    createFilterHtml(dateArray) {
      dateArray = this.validDateArray(dateArray);
      let htmlLines = dateArray.map((date) => {
        let isoDate = date.toISOString().split("T")[0] + "T00:00:00+00:00";
        return `<li>Date: <span fs-cmsfilter-field="${this.fsCmsFilterField}" fs-cmsfilter-type="date">${isoDate}</span></li>`;
      });
      let html = htmlLines.join("\n");
      html = `<div filter-data><ul>${html}</li></div>`;
      return html;
    }
    preparePageFilterData() {
      document.querySelectorAll(".w-condition-invisible").forEach((element) => {
        element.remove();
      });
      document.querySelectorAll("[date-rule]").forEach((element) => {
        var dateRuleType = element.getAttribute("date-rule");
        if (!element.textContent)
          return;
        var json = JSON.parse(element.textContent);
        var html;
        switch (dateRuleType) {
          case "list":
            console.log(json.dates);
            var dateArray = this.getDatesList(json.dates);
            html = this.createFilterHtml(dateArray);
            element.replaceWith(html);
            break;
          case "range":
            json.fromDate = new Date(json.from);
            json.toDate = new Date(json.to);
            html = this.createFilterRangeHtml(json.fromDate, json.toDate);
            element.replaceWith(html);
            break;
          case "restricted-range":
            json.fromDate = new Date(json.from);
            json.toDate = new Date(json.to);
            console.log(json);
            var dateArray = this.getDatesByWeekdays(json.fromDate, json.toDate, json.days);
            html = this.createFilterHtml(dateArray);
            element.replaceWith(html);
            break;
          default:
            console.warn(`Unknown date rule ${dateRuleType}`);
            break;
        }
      });
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
//# sourceMappingURL=filter.js.map
