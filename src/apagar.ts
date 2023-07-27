
/** 
 * ORBIT 
 * Apagar  
 * 
 * Clear date
 * 
 * Dependencies
 * - Flatpickr date field handler
 */ 


export class Apagar {

    constructor() {
    }

    // Installs apagar (clear date)
    // handlers that clears the date using flatpickr. 
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

    
    

    
    
    
    