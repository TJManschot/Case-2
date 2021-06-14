import {Route} from '@angular/router';
import {AdvertentiePagina} from './pages/advertentie-pagina/advertentie.pagina';
import {NewUserPagina} from './pages/new-user-pagina/new-user.pagina';
import {AdvertentieAanmakenPagina} from './pages/advertentie-aanmaken-pagina/advertentie-aanmaken.pagina';

export const routes: Route[] = [
  {path: 'advertenties', component: AdvertentiePagina},
  {path: 'registreren', component: NewUserPagina},
  {path: 'advertentie/aanmaken', component: AdvertentieAanmakenPagina}
];
