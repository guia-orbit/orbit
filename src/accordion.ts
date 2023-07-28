
/*
 * ORBIT 
 * Accordion Utilities 
 * 
 */ 

//import { AdjustTrackingUrl } from './adjust';

// Global object
window['Orbit'] = window['Orbit'] || {}; 
var Orbit = window['Orbit'];


// Define the type for an element with the necessary properties
interface AccordionElement extends HTMLElement {
    // style: {
    //     maxHeight: string | null;
    // };
    scrollHeight: number;
    nextElementSibling: AccordionElement;
}

export class Accordion {

    constructor() {
    }
    
    // container (holds set)
    // - item (one item)
    // - - header/title
    // - - - indicator expanded/collapsed 
    // - - content panel


    init() {

        // Find accordions
        const accordionBtns = document.querySelectorAll("[wfu-ui-accordion=header]") as NodeListOf<AccordionElement>;

        accordionBtns.forEach((accordion: AccordionElement) => {

          accordion.onclick = function () {
            accordion.classList.toggle("is-open");
        
            let content = accordion.nextElementSibling;
            console.log(content);
        
            if (content.style.maxHeight) {
              //this is if the accordion is open
              content.style.maxHeight = "auto";
            } else {
              //if the accordion is currently closed
              content.style.maxHeight = content.scrollHeight + "px";
              console.log(content.style.maxHeight);
            }
          };
        });

    }

}

    
    

    
    
/* DEPRECATED CODE


const accordionBtns = document.querySelectorAll("[wfu-ui-accordion=header]");

accordionBtns.forEach((accordion) => {
  accordion.onclick = function () {
    this.classList.toggle("is-open");

    let content = this.nextElementSibling;
    console.log(content);

    if (content.style.maxHeight) {
      //this is if the accordion is open
      content.style.maxHeight = null;
    } else {
      //if the accordion is currently closed
      content.style.maxHeight = content.scrollHeight + "px";
      console.log(content.style.maxHeight);
    }
  };
});

*/
    