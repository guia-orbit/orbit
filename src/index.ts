/*
 * ORBIT
 * Main entry point
 * 
 */

import { DateFilter } from './datefilter';
import { Apagar } from './apagar';
import flatpickr from 'flatpickr'; 
import { Hoje } from './hoje';

// // Global object
// window['Orbit'] = window['Orbit'] || {}; 
// var Orbit = window['Orbit'];


const init = () => {

    console.clear(); 
    console.log("main", "init 0.1.1");
    
    // Modify HTML elements for 
    // FS CMS Filter date filtering support
    // ( disabled as we're now doing this in Airtable ) 
    // var filter = new DateFilter();
    // filter.init();


  //  $(function() {
          
//        preparePageFilterData();
        
    //  });

    // Install & configure flatpickr 
    let datePicker = document.getElementsByClassName('date'); 
    var flatpickrInstance = flatpickr(datePicker, {
        mode: "single", // "range",
        altInput: true,
        altFormat: "j/n/Y",
        dateFormat: "Y-m-d", // "Y-m-dT00:00:00+00:00", // "j/n/Y",
    });

    // Install Apagar date-reset handler
    (new Apagar).init();

    // Install Hoje handler to set today's date 
    // in the date filter. 
    (new Hoje).init();
    

}



// Auto-execute on DOM load 
document.addEventListener("DOMContentLoaded", init);

// // Use this if we will be using Webflow.require() functions. 
// var Webflow = Webflow || [];
// Webflow.push(function() {
//     init();
// });

