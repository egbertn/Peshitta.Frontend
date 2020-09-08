import {autoinject} from 'aurelia-framework';
@autoinject
export class SetPositionCustomAttribute {
    private readonly element: HTMLElement;
    constructor(element: Element ) {
        this.element = <HTMLElement>element;
    }
    
    //bind() {}
    attached() {
      let parentPos = this.element.parentElement.getBoundingClientRect();
      this.element.style.marginTop = '-15px';
      this.element.style.right = '15px'
            // console.log(`${parentPos.top}:${parentPos.right}`)
      this.element.style.visibility = 'visible';
    }
}
