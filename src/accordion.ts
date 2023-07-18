
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

    /*
    // Linkify images inside the rich text content
    linkifyRichTextImages(rtfElement: Element, url: AdjustTrackingUrl): void {
        
        const images = rtfElement.getElementsByTagName('img');
        
        for (let image of images) {
            let currentParent: ParentNode | null = image.parentNode;
        
            // Check if the image is already inside a link
            let insideLink = false;
            while (currentParent != null) {
                if ((currentParent as Element).tagName === 'A') {
                    insideLink = true;
                    break;
                }
                currentParent = currentParent.parentNode;
            }
        
            // If not inside a link, wrap it in a link
            if (!insideLink) {
        
                // Allow overriding of the Adjust tracking using custom attributes 
                const imageCreative = image.getAttribute('adjust-creative') ?? url.creative;
                const imageAdgroup = image.getAttribute('adjust-adgroup') ?? url.adgroup;
                const imageCampaign = image.getAttribute('adjust-campaign') ?? url.campaign;

                const imageTrackingUrl = new AdjustTrackingUrl(
                    url.baseUrl, imageCreative, imageAdgroup, imageCampaign
                ).toString();    
                
                let wrapper = document.createElement('a');
                wrapper.href = imageTrackingUrl;
                wrapper.target = "_blank";
            
                (image.parentNode as Element).insertBefore(wrapper, image);
                wrapper.appendChild(image);
            }
        }
    
    }

    // Linkify "RISE app" in rich text content
    // override the url where it is already linked
    linkifyRichTextRISE(rtfElement: Element, url: AdjustTrackingUrl): void {

        const linkText: string = 'RISE\\s*app'; // The "\\s*" matches any amount of whitespace, including no whitespace
    
        // Create the tracking URL
        const linkTrackingUrl: string = url.toString(); 

        const nodeIterator: NodeIterator = document.createNodeIterator(rtfElement, NodeFilter.SHOW_TEXT, null);
        const nodes: Node[] = [];
    
        // Get text as a set of nodes 
        let node: Node | null;
        while (node = nodeIterator.nextNode()) {
            nodes.push(node);
        }
    
        // Iterate through nodes
        for (let textNode of nodes) {

            // Look for regex match
            let regex: RegExp = new RegExp(linkText, 'gi'); // 'i' makes the search case-insensitive
            if (regex.test(textNode.textContent as string)) {

                // Get parent, test if it's a link 
                let parent: Node | null = textNode.parentNode;
                if (parent && parent.nodeName !== 'A') {

                    let frag: DocumentFragment = document.createDocumentFragment();
                    let lastIndex: number = 0;
                    let match: RegExpExecArray | null;
                    regex.lastIndex = 0; // Reset the regex, because ".test()" changes the lastIndex
    
                    while (match = regex.exec(textNode.textContent as string)) {

                        if (!textNode.textContent) continue; 

                        let text: string = textNode.textContent.substring(lastIndex, match.index);
                        frag.appendChild(document.createTextNode(text));
    
                        let link: HTMLAnchorElement = document.createElement('a');
                        link.textContent = match[0]; // Use the matched text, which may include extra spaces
                        link.href = linkTrackingUrl;
                        link.target = "_blank";
                        frag.appendChild(link);
    
                        lastIndex = regex.lastIndex;
                    }
    
                    if (!textNode.textContent) continue; 

                    frag.appendChild(
                        document.createTextNode(textNode.textContent.substr(lastIndex))
                    ); 
                    parent.replaceChild(frag, textNode);

                } else if(parent) {

                    // If there is a parent A already, we override its Url 
                    (parent as HTMLAnchorElement).setAttribute("href", linkTrackingUrl); 
                    (parent as HTMLAnchorElement).setAttribute("target", "_blank"); 

                }
    
            }

        }
    }
    
    // Linkify rich text content in one element
    linkifyRichText(rtfElement: Element, url: AdjustTrackingUrl): void {
    
        this.linkifyRichTextImages(
            rtfElement, url
            ); 
        this.linkifyRichTextRISE(
            rtfElement, url
            );
    
    }
    
    // Linkify all rich text elements
    linkifyAllRichText(elemSelector: string) { 

        // Create and resolve Adjust tracking url
        var url: AdjustTrackingUrl = new AdjustTrackingUrl(); 
        if (Rise.adjustTrackingUrl)
            url = Rise.adjustTrackingUrl(url);
        else {
            console.error ("No Adjust tracking handler");
            return; // do not linkify 
        }

        // Get all elements with the selector
        var richTextElements = document.querySelectorAll(elemSelector);

        // Exit, if nothing found
        if(!richTextElements) {
            console.warn ("No rich text elements found to linkify.");
            return;
        }

        // Iterate through each element
        richTextElements.forEach((element: Element) => {

            if(!element)
                return;

            // Linkify the identified rich text element
            this.linkifyRichText(element, url); 
        
        });
    
    }
*/
}

    
    

    
    
    
    