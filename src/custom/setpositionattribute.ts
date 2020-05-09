import {autoinject} from 'aurelia-framework';
@autoinject
export class SetPositionCustomAttribute {

    constructor(private element: Element ) {
        var el = <HTMLElement>element;
        el.style.top =  element.parentElement.clientTop - 10 + 'px';
        el.style.right = element.parentElement.clientLeft + 'px';
    }
    

    bind() {
        console.log('la di dah');
    }
}
