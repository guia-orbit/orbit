/*
 * ORBIT
 * Main entry point
 * 
 */

import { DateFilter } from './datefilter';


// Global object
window['Orbit'] = window['Orbit'] || {}; 
var Orbit = window['Orbit'];

//var Webflow = Webflow || [];
//Webflow.push(function() {

const init = () => {

    console.clear(); 
    console.log("main", "init.");
    
    var filter = new DateFilter();
    filter.init();


  //  $(function() {
          
//        preparePageFilterData();
        
    //  });



    // Configure flatpickr 
    // var Webflow = Webflow || [];
    // Webflow.push(function () {
    //     document.getElementsByClassName('date').flatpickr({
    //         mode: "single", // "range",
    //     altInput: true,
    //     altFormat: "j/n/Y",
    //     dateFormat: "Y-m-d", // "Y-m-dT00:00:00+00:00", // "j/n/Y",
    //   });
    // });


    
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



// Auto-execute on DOM load 
document.addEventListener("DOMContentLoaded", init)