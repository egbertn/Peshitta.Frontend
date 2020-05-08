import { BookModelView } from './models/TextMeta';
import { RouteConfig, NavigationInstruction} from 'aurelia-router';
import { AppConfigService } from './services/app-config.service';
import {autoinject, computedFrom} from 'aurelia-framework';


@autoinject
export class ReadBible {
  private beids:number[];  
  //cache which has been read from api
  private bookidAndChapter:{bookid:number, chapters:number[] } [];
  bookidAndChapterString: string;
  constructor(private config: AppConfigService) {
    this.bookidAndChapter = [];
    this.bookidAndChapterString = '';
  }

async expandChapter(div: HTMLInputElement) {
  var i = div.parentElement.getAttribute('data-id');
  var beidandch = i.split('_').map(m => Number.parseInt(m));
  // SHOULD be 2 length first bookeditionid (bookid) then chapter
  var idx = 0;
  var exists = this.bookidAndChapter.findIndex(f => f.bookid === beidandch[0] && f.chapters.includes(beidandch[1]));
  if (exists === 0) { 
    return;
  } 
  // bookid existed but the chapter not
  if ((idx = this.bookidAndChapter.findIndex(f => f.bookid === beidandch[0])) >= 0){
    this.bookidAndChapter[idx].chapters.push(beidandch[1]);
  }
  //both did not yet exist
  else {
    this.bookidAndChapter.push( {bookid:beidandch[0], chapters:[ beidandch[1]] });
  } // bookedition is in cache but not the chapter
  
  // get textids from cache by finding bookid and ch
  await this.config.ExpandVersesFromChapter(this.beids, beidandch[1]);
  this.bookidAndChapterString = this.bookidAndChapter.map(m => m.bookid.toString() + ':' + m.chapters.join()).join();
}

@computedFrom('bookidAndChapterString')
get selectedBookEditions(): BookModelView[] {
  const ret = this.config.GetChaptersFromBeids(this.beids);
  return ret;
}
bookCount(isMediumLayout: boolean): number{
  return isMediumLayout === false ? 12 / this.beids.length : 12 / this.beids.length *2;
}
activate(params: any, routeConfig: RouteConfig, navigationInstruction: NavigationInstruction) {
    if (typeof params.beid === 'string')
      this.beids = [Number.parseInt(params.beid)]
    else
      this.beids = params.beid.map((m: string) => Number.parseInt(m));

  }
}
