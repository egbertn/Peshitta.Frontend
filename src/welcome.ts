import { Router , RouteConfig, NavigationInstruction} from 'aurelia-router';
import { AppConfigService } from './services/app-config.service';
import {autoinject,} from 'aurelia-framework';
import { KeyValue } from 'models/keyValue';

@autoinject
export class Welcome {

  public heading: string = 'Selectie van boeken';
   public reference: string = 'Mt 10:13';
  // public lastName: string = 'Doe';
  // private previousValue: string = this.fullName;
  constructor(private config:  AppConfigService) {
  var a=10;
  }
  // Getters can't be directly observed, so they must be dirty checked.
  // However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  // @computedFrom('firstName', 'lastName')
  // get fullName(): string {
  //   return `${this.firstName} ${this.lastName}`;
  // }

  get selectedPublications(): KeyValue[] {
    return this.config.selectedPublications;
  }
  async change(item: HTMLInputElement) {

    var value=item.value;
    var checked = item.checked;
    await this.config.ToggleBook(value, checked); 

    return true
  }
  activate(params: any, routeConfig: RouteConfig, navigationInstruction: NavigationInstruction)
  {
var a=10;
  }
  public next() {
    //this.previousValue = this.fullName;
    //alert(`${this.config.config.bibleService.baseUrl} Welcome, ${this.fullName}!`);
    // this.router.navigateToRoute('books', {id: 10});
  }

  // public canDeactivate(): boolean | undefined {
  //   if (this.fullName !== this.previousValue) {
  //     return confirm('Are you sure you want to leave?');
  //   }
  // }



  
}

export class UpperValueConverter {
  public toView(value: string): string {
    return value && value.toUpperCase();
  }
}
