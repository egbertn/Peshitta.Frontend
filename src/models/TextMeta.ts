
export class TextMeta
{
  textid: number;
  //bookchapteralinea
  bca: number;
  //alineaid
  aid: number;
  //bookeditionid
  beid: number;
  //chapter
  ch: number;
  //for grouping not filled by api
  bookid: number;
}
export class groupedBooks{
  bookId: number;
  bookEditions: BookEditionMeta[];
}
export class chapterMeta {
  chapter: number;
  textMeta: TextMeta[];
}
export class BookEditionMeta
{
  beid: number ;
  bookid: number ;
  pc: string ;
  langid: number;
  title: string ;
  entitle: string ;
  descr: string;
  bo: number ;
  abr: string ;
}
export class TextWithMeta 
{
  text: TextMeta[];
  bookEditions: BookEditionMeta[];
}
export class ExpandedText {
  textId: number;
  beid: number;
  chapter: number;
  verse: number;
  content: string;
  header: string;
  footer: string;
  done: boolean ; //when true, do not perform lookup
}

export class ChapterModelView  {
  ch:number;
  texts:ExpandedText[];
}

export class BookEditionModelView  {
  constructor (meta: BookEditionMeta, chapters: ChapterModelView[]) {
    this.meta = meta;
    this.chapters = chapters;
  }
  meta: BookEditionMeta;
  chapters: ChapterModelView[];
}
export class BookModelView {
  title: string; //main title Enlish
  bookId: number;
  bookEditions: BookEditionModelView[]; 
}
