import {Route} from '@angular/router';
import {AdvertentiePagina} from './pages/advertentie-pagina/advertentie.pagina';
import {NewUserPagina} from './pages/new-user-pagina/new-user.pagina';

export const routes: Route[] = [
  {path: 'advertenties', component: AdvertentiePagina},
  {path: 'singup', component: NewUserPagina}
];
