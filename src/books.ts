
import { groupedBooks, BookEditionMeta,  } from './models/TextMeta';
import { AppConfigService, textWithMeta } from './services/app-config.service';
import { autoinject, computedFrom } from 'aurelia-framework';
import {  RouteConfig, NavigationInstruction} from 'aurelia-router';

@autoinject
export class Books {
  public heading = 'Het Nieuwe Testament volgens de Peshitta';
  public users= [];
  
  constructor(private config: AppConfigService) {

  }
 
  bookEditionsQueryStrings(bes: BookEditionMeta[]): string {
    return '#/readbible/?' + bes.map(m => 'beid=' + m.beid).join('&');
  }
  @computedFrom('textWithMeta')
  get booksFromMeta(): groupedBooks[] {
    return this.config.getCacheMeta;    
  }
  activate(params: any, routeConfig: RouteConfig, navigationInstruction: NavigationInstruction)
  {
      var router = navigationInstruction.router;
  }
}
