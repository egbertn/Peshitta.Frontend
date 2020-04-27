import { TextWithMeta, groupedBooks, BookEditionWithChaptersMeta, BookEditionMeta, BookModelView, BookEditionModelView, ExpandedText, ChapterModelView } from './../models/TextMeta';
import { AppConfig } from '../models/appconfig';
import {autoinject} from 'aurelia-framework';
import {HttpResponse} from './HttpResponse';
import {KeyValue} from './../models/keyValue';
import {groupBy, distinct} from '../models/group';
let instance = null;
export
let textWithMeta: TextWithMeta = null;
@autoinject
export class AppConfigService {
  private appConfig: AppConfig;
  private headers: Headers;
  private baseUrl: string;
  selectedPublications: KeyValue[];

  constructor() {
    if(!instance) {
			instance = this;
    }
    //Todo get from /Content/publications 
    this.selectedPublications = [{value: "Peshitta NL", key:"AB", "selected": false}, {value: "Peshitta Syrisch", key: "PS", "selected": false}];
    this.baseUrl = 'https://www.peshitta.nl/';
    this.headers = new Headers();
    this.headers.append('content-type', 'application/json');
    this.headers.append('accept', 'application/json');
     return instance;
  }

  async  post<T>(
    path: string,
    body: any,
    args: RequestInit = {  method: "post", body: JSON.stringify(body), headers:  this.headers }
  ): Promise<HttpResponse<T>>  {
    return await this.http<T>(new Request(this.baseUrl + path, args));
  };
  
  async get<T>(
    path: string,
    args: RequestInit = {  method: "get", headers: this.headers }
  ) {
    return await this.http<T>(new Request(this.baseUrl + path, args));
  }

  async http<T>(
    request: Request
  ): Promise<HttpResponse<T>> {
   
    const response: HttpResponse<T> = await fetch(
      request
    );
    try {
      // may error if there is no body
      response.parsedBody = await response.json();
    } catch (ex) {}
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response;
  
  }
  GetChaptersFromBeids(beids:number[]): BookEditionWithChaptersMeta
  {
    console.log(`bookeditions count ${textWithMeta.bookEditions.length} ${textWithMeta.text.length} ${textWithMeta.text[0].beid}`)
    
    const textMeta = textWithMeta.text.filter(f => beids.includes( f.beid));
    const ret = new BookEditionWithChaptersMeta();
    
   
    textMeta.forEach(f => {
      f.bookid = textWithMeta.bookEditions.filter(where => where.beid === f.beid).map(m => m.bookid)[0];
    });
    const temp =  groupBy(textMeta, (t)=> t.bookid).map( (group)=>
      ({'bookId': group.key, 
        'title':   'temporary',
       'bookEditions': groupBy(group.members, (tm)=> tm.beid).map(mm =>
        ({ 
            'meta': textWithMeta.bookEditions.filter(ff => ff.beid === mm.key)[0],
            'chapters': groupBy( mm.members, ch => (ch.beid.toString() + '|' + ch.ch.toString()) ).map(mmm => 
              { 
                return {
                        ch: Number.parseInt( mmm.key.split('|')[1]),
                        texts: mmm.members.map(exp => 
                        { 
                          return {beid: exp.beid,  chapter: exp.ch, verse: exp.aid, done: false} as ExpandedText
                        })
                  } as  ChapterModelView 
              })
        }))
    })); 
    ret.books = temp;
    return ret;
  }
  get getCacheMeta(): groupedBooks[]
  {
    const sorted = textWithMeta.bookEditions.sort((a,b) => a.bookid - b.bookid);
    const g = groupBy(sorted, (t)=> t.bookid).map((group)=>{return {bookId: group.key, bookEditions: group.members}});
    g.sort((a, b) => a.bookEditions[0].bo - b.bookEditions[0].bo)
    return g;
  }
  
  async getMetaData(pubCodes: string[]): Promise<TextWithMeta>
  {

    try {
      var response = await this.get<TextWithMeta>(
        'Content/BookMetaData/?' + pubCodes.map(r => 'pub=' + r).join('&')
      );
      return response.parsedBody;
    } catch (response) {
      console.error(response);
    }  
    return undefined;
  }
  async ToggleBook(pubCode: string, checked: boolean): Promise<void> {
      this.selectedPublications.forEach(element => {
        if (element.key === pubCode) {
          element.selected = checked;
        }
        
      });
      textWithMeta = await this.getMetaData(this.selectedPublications.filter(f => f.selected).map(r => r.key))
  }
  get config(): AppConfig {

    if (this.appConfig == null)
    {

      this.get('Content/config').then(resp => resp.json()).then( (response: AppConfig) => {this.appConfig = response});
   
    }  
    return this.appConfig;
  }
}
