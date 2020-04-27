import { BookEditionMeta,  BookModelView } from './models/TextMeta';
import { Router , RouteConfig, NavigationInstruction} from 'aurelia-router';
import { AppConfigService } from './services/app-config.service';
import {autoinject, computedFrom} from 'aurelia-framework';


@autoinject
export class ReadBible {
  private beids:number[];
  private chapter:number;
  constructor(private config: AppConfigService) {

  }

expandChapter(div: HTMLInputElement) {
  
}
@computedFrom('this.beids')
get selectedBookEditions(): BookModelView[] {
  const ret = this.config.GetChaptersFromBeids(this.beids);
  return ret;
}

activate(params: any, routeConfig: RouteConfig, navigationInstruction: NavigationInstruction) {
    this.beids = params.beid.map((m: string) => Number.parseInt(m));
    this.chapter = params.chapter ?? 1;
  }
}
