import {autoinject} from 'aurelia-framework';
@autoinject
export class SetPositionCustomAttribute {
    private readonly element: HTMLElement;
    constructor(element: Element ) {
        this.element = <HTMLElement>element;
    }
    

    bind() {
      let parentPos = this.element.parentElement.getBoundingClientRect();
      this.element.style.top =  parentPos.top - 10 + 'px';
      this.element.style.right = parentPos.right + 10 + 'px';
      console.log(`${parentPos.top}:${parentPos.right}`)
      this.element.style.visibility = 'visible';
    }
}
