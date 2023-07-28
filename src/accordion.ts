
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
interface AccordionItemElement extends HTMLElement {
    // style: {
    //     maxHeight: string | null;
    // };
    scrollHeight: number;
    nextElementSibling: AccordionItemElement;
}

export class Accordion {

    constructor() {
    }
    
    // container (holds set)
    // - item (one item)
    // - - header/title
    // - - - indicator expanded/collapsed 
    // - - content panel


    toggleItem(accordion: AccordionItemElement) {

        let isOpen = accordion.classList.contains("is-open");
        let content = accordion.nextElementSibling;

        if(isOpen) {

          // Close item
          accordion.classList.remove("is-open");

          // Collapse content panel
          content.style.removeProperty("max-height"); 
          content.style.maxHeight = "auto";

        } else {

          // Open item
          accordion.classList.add("is-open");

          // Expand content panel
          content.style.maxHeight = content.scrollHeight + "px";
  
        }

    }

    init() {

        // Find accordions
        const accordionBtns = document.querySelectorAll("[wfu-ui-accordion=header]") as NodeListOf<AccordionItemElement>;

        accordionBtns.forEach((accordionItem: AccordionItemElement) => {

            accordionItem.onclick = () => {

                this.toggleItem(accordionItem);

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
    