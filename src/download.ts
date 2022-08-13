import { autoinject, computedFrom } from 'aurelia-framework';
import { AppConfigService, textWithMeta } from './services/app-config.service';

@autoinject
export class Dowload {
  public heading = 'Download Peshitta 2022';
  public users= [];
  
  constructor(private config: AppConfigService) {

  }
 


}
