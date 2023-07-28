/*
 * ORBIT
 * Main entry point
 * 
 */

import { DateFilter } from './datefilter';
import { Apagar } from './apagar';
import flatpickr from 'flatpickr'; 
import { Hoje } from './hoje';
import { WhatsApp } from './whatsapp'; 
import { Accordion } from './accordion';

// // Global object
// window['Orbit'] = window['Orbit'] || {}; 
// var Orbit = window['Orbit'];


const init = () => {

    const consoleStyle = "background-color: #E9C46A; color: #E76F51; font-weight: bold; border: padding 0 4px;";

    console.clear(); 
    console.debug("%cORBIT", consoleStyle, "init 0.1.3");

    //
    // Run on all pages, site-wide
    //

    console.debug("%cORBIT", consoleStyle, "running site-wide code");

    (new WhatsApp()).init();
    
    //
    // Run on homepage only 
    // which includes filter elements 
    //

//    console.debug("main", "%crunning homepage code", "background-color: yellow;");
    console.debug("%cORBIT", consoleStyle, "running homepage code");

    if (window.location.pathname == "/") {

        // Modify HTML elements for 
        // FS CMS Filter date filtering support
        // ( disabled as we're now doing this in Airtable ) 
        // var filter = new DateFilter();
        // filter.init();

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
        
        // Install Accordion handler
        (new Accordion).init(); 

    }


}



// Auto-execute on DOM load 
document.addEventListener("DOMContentLoaded", init);

// // Use this if we will be using Webflow.require() functions. 
// var Webflow = Webflow || [];
// Webflow.push(function() {
//     init();
// });

