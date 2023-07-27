
/** 
 * ORBIT 
 * Hoje  
 * 
 * Set today's date
 * 
 * Dependencies
 * - Flatpickr date field handler
 * https://www.npmjs.com/package/flatpickr
 */ 

import flatpickr from 'flatpickr';


export class Hoje {

    constructor() {
    }

    // Installs hoje (set date filter to today)
    // sets the date using flatpickr. 
    init() {

        var button: HTMLElement = document.getElementById('hoje-button') as HTMLElement;
        button.addEventListener('click', () => {

            // Get the date picker input element using its ID
            var datePicker: HTMLElement = document.getElementById('date') as HTMLElement;

            // Handle missing date picker 
            if(!datePicker) {
                console.error ("Unable to locate date picker for hoje button click event.");
                return;
            }

            // Create a Flatpickr instance with the desired options
            var flatpickrInstance = flatpickr(datePicker, {
                dateFormat: 'd/m/Y',
                // Add any other Flatpickr options you need
            });

            // Get today's date
            var today = new Date();

            // Format today's date as per the Flatpickr date format
            var formattedDate = flatpickrInstance.formatDate(
                today, 
                'd/m/Y'
                );

            // Set today's date using the Flatpickr API
            flatpickrInstance.setDate(
                formattedDate, 
                true // Passing `true` to close the calendar after selecting 
                ); 

            // Scroll into view
            var container: HTMLElement = document.getElementById('content-filter') as HTMLElement;
            container?.scrollIntoView({ 
                behavior: 'smooth' 
            });
            
        });

    }

}

    
    

    
    
    
    