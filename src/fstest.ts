
/*
 * ORBIT 
 * FS Test Utilities 
 * 
 */ 

//import { AdjustTrackingUrl } from './adjust';

// Global object
window['Orbit'] = window['Orbit'] || {}; 
var Orbit = window['Orbit'];

export class FSTest {

    constructor() {
    }
    
    init() {

        window['fsAttributes'] = window['fsAttributes'] || [];
        window['fsAttributes'].push([
          'cmsload',
          (listInstances) => {
            
            console.log('cmsload Successfully loaded!');
        
            // The callback passes a `listInstances` array with all the `CMSList` instances on the page.
            const [listInstance] = listInstances;
        
            console.log(listInstance); 
            if(!listInstance) return;
            
            console.log("cms lists", listInstances?.length); 
            
            console.log("cms items in list", listInstance?.items?.length); 
            
            if (listInstance && listInstance.items) {
                console.log("item", listInstance?.items[0]); 
                console.log("item", listInstance?.items[1]); 
            }
            
            // The `renderitems` event runs whenever the list renders items after switching pages.
            listInstance.on('renderitems', (renderedItems) => {
        //      preparePageFilterData();
              console.log("cmsload", renderedItems);
            });
            
            
            listInstance.on('additems', (addedItems) => {
              console.log("cmsload", 'The following items have been added to the CMSList memory: ', addedItems);
            });
            
            console.log("GO BABY GO!!")
            
          },
        ]); 
        
        window['fsAttributes'] = window['fsAttributes'] || [];
        window['fsAttributes'].push([
          'cmsfilter',
          (filterInstances) => {
            
            console.log('cmsfilter Successfully loaded!');
        
            // The callback passes a `listInstances` array with all the `CMSList` instances on the page.
            const [filterInstance] = filterInstances;
        
            console.log(filterInstance); 
            if(!filterInstance) return;
            
            console.log("cms items in list", filterInstance.listInstance?.items?.length); 
        
            // The `renderitems` event runs whenever the list renders items after switching pages.
            filterInstance.listInstance.on('renderitems', (renderedItems) => {
        //      preparePageFilterData();
        //      console.log(renderedItems);
              console.log("cmsfilter", renderedItems); 
            });
            
            
            filterInstance.listInstance.on('additems', (addedItems) => {
              console.log("cmsfilter", 'The following items have been added to the CMSList memory: ', addedItems);
            });
            
                  filterInstance.listInstance.on('switchpage', (targetPage) => {
                console.log("cmsfilter", 'switchpage event', 'The user has navigated to the page number ', targetPage);
              });
          },
        ]); 

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

    
    

    
    
    
    