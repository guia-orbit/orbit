
/** 
 * ORBIT 
 * WhatsApp  
 * 
 */ 



export class WhatsApp {

    constructor() {
    }

    // Installs WhatsApp link. 
    init() {

        let title = document.title;
        let url = window.location.href;

        let elements = document.querySelectorAll('[data-share-whatsapp]');
        elements.forEach((element) => {

            // BUG: ?? I think this is incomplete, it may not establish the phone number to send to 
            element.setAttribute('href', 'https://wa.me/?text=' + url + "?utm_source=siteshare");
            element.setAttribute('target', '_blank');

        });

    }

}

    
    

    
    
    
    