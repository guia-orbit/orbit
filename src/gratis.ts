
/** 
 * ORBIT 
 * Gratis  
 * 
 * Free events
 * 
 */ 

const PRICE_GRATIS = "0.01"; 

export class Gratis {

    constructor() {
    }

    // Installs hoje (set date filter to today)
    // sets the date using flatpickr. 
    init() {

        let button: HTMLElement = document.getElementById('gratis-button') as HTMLElement;
        button.addEventListener('click', () => {

            // let checkbox: HTMLElement | null = document.getElementById('gratis-checkbox');
            // if (checkbox)
            //     checkbox.click();
        
            // Update price input 
            let rangeSliderInput: HTMLInputElement | null = document.querySelector("input.rangeslider_input"); 
            if (rangeSliderInput)
                rangeSliderInput.value = PRICE_GRATIS;

            // Update FS range slider 
            // HACK: 
            let rangeSliderHandle: HTMLElement | null = document.querySelector("div[fs-rangeslider-element=handle]"); 
            if (rangeSliderHandle) {
                rangeSliderHandle.setAttribute("aria-valuenow", PRICE_GRATIS);
                rangeSliderHandle.style.left = "0px";
            }
            let rangeSliderFill: HTMLElement | null = document.querySelector("div[fs-rangeslider-element=fill]");
            if (rangeSliderFill) {
                rangeSliderFill.style.width = "0px"; 
            }
            let rangeSliderDisplayValue: HTMLElement | null = document.querySelector("[fs-rangeslider-element=display-value]");
            if (rangeSliderDisplayValue) {
                rangeSliderDisplayValue.innerText = PRICE_GRATIS; 
            }

            // Generate an 'input' event 
            // must be bubbled to trigger FS filter's change detector 
            //let event = new Event("input", { bubbles: true });
            rangeSliderInput?.dispatchEvent(new Event("input", 
                { bubbles: true }
                ));
//   $("#startDate")[0].dispatchEvent(event);
//   $("#endDate")[0].dispatchEvent(event);

//rangeSliderInput.eve

            // Scroll
            let container: HTMLElement | null = document.getElementById('content-filter');
            if (container)
                container.scrollIntoView({ behavior: 'smooth' });

        }); 

    }

}

    
    

    
    
    
    