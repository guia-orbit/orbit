
/*
 * ORBIT 
 * Filter Utilities 
 * 
 */ 

//import { AdjustTrackingUrl } from './adjust';

// Global object
window['Orbit'] = window['Orbit'] || {}; 
var Orbit = window['Orbit'];

export class Filter {

    readonly fsCmsFilterField: string = "data";

    constructor() {
    }

    // Parses string date in D/M/Y format
    // Returns a date object  
    parseDate(dateString) {
        let [day, month, year] = dateString.split(/\/|-/).map(Number);
        let d = new Date(Date.UTC(year, month - 1, day)); // JavaScript counts months from 0
    //console.log("date parsed", d, dateString); 
        return d;
    } 

    // Returns an array of dates parsed from a text string
    // D/M/Y format, delimited by spaces, line breaks or commas 
    getDatesList(text) {
        var data = text; // $(this).text();
    //    console.log (data);
    
        if(!data) return null;
        
        let dateString = data; // "2023-01-01,2023-01-02,2023-01-03";
        let dateStringArray = dateString.split(/[\s,]+/);
    //  console.log("getDatesList", dateStringArray); 
        let dateArray = dateStringArray.map(date => {
            let d = this.parseDate(date);
    //      console.log("dateparsed", d);
            if (isNaN(d.getTime()))
            console.error("invalid date", date);
            return d;
        }); // new Date(date));
        // console.log("dateArray", dateArray); 
        dateArray[0]
        return dateArray;    
    }

    // Returns a date array for a weekday-restricted range
    getDatesByWeekdays(start, end, weekdayNames) {
        
        const weekdays: string[] = weekdayNames.split(/[\s,]+/); 
        //['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; // assuming this as an example
//            const weekdayToNumber: { [key: string]: number } = { 'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6 }; // assuming this as an example
        
//          var weekdays = weekdayNames.split(/[\s,]+/); 
    
        const weekdayToNumber: { [key: string]: number } = {
            "seg": 1,
            "ter": 2,
            "qua": 3,
            "qui": 4,
            "sex": 5,
            "sab": 6,
            "dom": 0,
        };
    
        const dates: Date[] = [];
        let currentDate: Date = new Date(start.getTime()); // clone the date to avoid modifying original
    
        while (currentDate <= end) {
            if (weekdays.includes(Object.keys(weekdayToNumber)[currentDate.getDay()])) {
                dates.push(new Date(currentDate));
            }
            currentDate.setDate(currentDate.getDate() + 1); // move to the next day
        }
    
        return dates;
    }
        
    // Create the Filter HTML for a Date Range
    createFilterRangeHtml(dateStart, dateEnd) {
    
        // Create list of date elements
        let isoDateStart = dateStart.toISOString().split('T')[0] + 'T00:00:00+00:00';
        let isoDateEnd = dateEnd.toISOString().split('T')[0] + 'T00:00:00+00:00';
    
        let html = ``;
        
    //  console.error("check", dateStart, dateEnd); 
        
        if (dateStart.getTime() == dateEnd.getTime()) {
        
            // https://finsweet.com/attributes/cms-filter
            html = 
                `<li>Exact: <span fs-cmsfilter-field="${this.fsCmsFilterField}" fs-cmsfilter-type="date">${isoDateStart}</span></li>`;
        
        } else {
        
            // https://finsweet.com/attributes/cms-filter
            html = 
                `<li>From: <span fs-cmsfilter-field="${this.fsCmsFilterField}" fs-cmsfilter-type="date" fs-cmsfilter-range="from">${isoDateStart}</span></li>` +
                `<li>To: <span fs-cmsfilter-field="${this.fsCmsFilterField}" fs-cmsfilter-type="date" fs-cmsfilter-range="to">${isoDateEnd}</span></li>`;
    
        }
    
        html = `<div filter-data><ul>${html}</li></div>`;
        
    //  console.log(html);
    
        return html;  
    }
    
    validDateArray(dateArray) {
        
        return dateArray.filter(d => !isNaN(d.getTime()));
    }
    
    // Create the Filter HTML for a Date Array
    createFilterHtml(dateArray) {
    
    //  console.log("createFilterHtml", dateArray);
        
        // Create list of date elements 
        // https://finsweet.com/attributes/cms-filter
        dateArray = this.validDateArray(dateArray); 
        
    //  console.log("valid createFilterHtml", dateArray);
        
        let htmlLines = dateArray.map(date => {
        
    //        console.error("invalid date", date);
        
    //    console.log("date", date, date.toISOString()); 
        
        let isoDate = date.toISOString().split('T')[0] + 'T00:00:00+00:00';
        return `<li>Date: <span fs-cmsfilter-field="${this.fsCmsFilterField}" fs-cmsfilter-type="date">${isoDate}</span></li>`;
        });
    
        let html = htmlLines.join('\n');
    
        html = `<div filter-data><ul>${html}</li></div>`;
        
    //  console.log(html);
    
        return html;  
    }
          
    preparePageFilterData() {
    
        // Remove any conditionally filtered elements permanently
        // as these will confuse FS CMS Filter
//          $(".w-condition-invisible").remove();

//          Array.from(document.querySelectorAll(".w-condition-invisible")).forEach((element: Element) => {
        document.querySelectorAll(".w-condition-invisible").forEach((element: Element) => {
            element.remove();
        });
        
//            Array.from(document.querySelectorAll("[date-rule]")).forEach((element: Element) => {
        document.querySelectorAll("[date-rule]").forEach((element: Element) => {
            
//          $("[date-rule]").each(function() {
        
//                var $this = $(this);
            var dateRuleType = element.getAttribute("date-rule");
        
            // Skip if no content 
            if(!element.textContent)
                return;


//                console.log($this.text())
            var json = JSON.parse(element.textContent);
            var html;
        
            switch(dateRuleType) {
                
                case "list":
            
                    console.log(json.dates);
                    
                    var dateArray: Date[] = this.getDatesList(json.dates); 
            //        console.log(dateArray);
                    
                    html = this.createFilterHtml(dateArray);
                    
                    // Replace the entire element
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
            
                    var dateArray: Date[] = this.getDatesByWeekdays(json.fromDate, json.toDate, json.days); 
            //        console.log(dateArray);
                    
                    html = this.createFilterHtml(dateArray);
            
                    element.replaceWith(html);
                    
                    break;
                default:
                    console.warn (`Unknown date rule ${dateRuleType}`);  
                    break;
            }
            
        });
        
        
        
        // Temporary date picker using HTML5 
        //  $("#date1").attr("type", "date");
        
    
        
    } 
    
    init() {
        
        // Clicked on Apagar
        // Use FS Filter reset for this field but also clear the Flatpickr element. 

        // Get all elements with attribute fs-cmsfilter-reset=data
        const elements = document.querySelectorAll("[fs-cmsfilter-reset=data]");

        // Add click event listener to each element
        elements.forEach((element: Element) => {
            element.addEventListener('click', function() {
                // Get flatpickr instance from element with id 'date'
                const dateElement = document.getElementById('date') as any;
                const fp = dateElement?._flatpickr;

                // Clear the flatpickr instance
                if(fp) {
                    fp.clear();
                }
            });
        });

    }

}

    
    

    
    
    
    