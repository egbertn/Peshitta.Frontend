import {inject, bindable, bindingMode, TaskQueue} from 'aurelia-framework';



@inject(TaskQueue)

export class MultiselectCustomElement {
  @bindable options;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value = [];
  constructor() {

  }
 

}
