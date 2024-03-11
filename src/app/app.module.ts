import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { registerLocaleData } from '@angular/common';
import ptbr from '@angular/common/locales/pt';
import { SidebarModule } from 'primeng/sidebar';
import { HttpClientModule } from '@angular/common/http';



registerLocaleData(ptbr)

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidenavComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    DividerModule,
    AvatarModule,
    SidebarModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR' 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
