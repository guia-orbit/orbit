/*
 * ORBIT
 * Main entry point
 * 
 */

import { Filter } from './filter';


// Global object
window['Orbit'] = window['Orbit'] || {}; 
var Orbit = window['Orbit'];

//var Webflow = Webflow || [];
//Webflow.push(function() {

const init = () => {

//    console.clear(); 
  
    var filter = new Filter();
        
  //  $(function() {
          
//        preparePageFilterData();
        
    //  });

    // blog.linkifyAllRichText(
    //   '[rise-markup=linkify]' 
    // );

}



// Auto-execute on DOM load 
document.addEventListener("DOMContentLoaded", init)