import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TicherComponent } from './components/ticher/ticher.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {ReactiveFormsModule} from '@angular/forms';

const appRoutes: Routes = [
  { path: 'test/:id',      component: TicherComponent },
  { path: '**', component: PageNotFoundComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    TicherComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
