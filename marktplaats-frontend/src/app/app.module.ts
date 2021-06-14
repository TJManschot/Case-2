import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {AppRoutingModule} from './app-routing.module';
import {AdvertentieComponent} from './components/advertentie/advertentie.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from './components/login/login.component';
import {AdvertentiePagina} from './pages/advertentie-pagina/advertentie.pagina';
import {RouterModule} from '@angular/router';
import {routes} from './app-routes';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {NewUserPagina} from './pages/new-user-pagina/new-user.pagina';
import {SignupComponent} from './components/registreren/registreren.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdresVragenComponent} from './components/adres-vragen/adres-vragen.component';
import {HttpClientModule} from '@angular/common/http';
import { LoguitComponent } from './components/loguit/loguit.component';
import { AdvertentieFormComponent } from './components/advertentie-form/advertentie-form.component';
import {AdvertentieAanmakenPagina} from './pages/advertentie-aanmaken-pagina/advertentie-aanmaken.pagina';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AdvertentieComponent,
    LoginComponent,
    AdvertentiePagina,
    UserProfileComponent,
    NewUserPagina,
    SignupComponent,
    AdresVragenComponent,
    LoguitComponent,
    AdvertentieFormComponent,
    AdvertentieAanmakenPagina
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
