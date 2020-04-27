import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Peshitta';
    config.map([
      {
        route: ['', 'welcome'],
        name: 'welcome',
        moduleId: './welcome',
        nav: true,
        title: 'Welcome'
      },
      {
        route: 'books',
        name: 'books',
        moduleId: './books',
        nav: true,
        title: 'Bijbelboek selectie'
      },{
        route: 'readbible',
        name: 'readbible',
        moduleId: 'readbible',
        nav:true,
        'title': 'Lees de Bijbel'
      }

    ]);

    this.router = router;
  }
}
