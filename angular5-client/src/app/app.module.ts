import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule, MatDialogModule, MatProgressSpinnerModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DialogComponent } from './dialog/dialog.component';
import { GlobalErrorHandler } from './global-error-handler';
import { ApiInterceptor } from './api.interceptor';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSnackBarModule,
    //Below 2 are used in Globel Popup
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    
    // config for Ngx translate
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CoreModule,
    AppRoutingModule,//all other child route must go before app routing
  ],
  declarations: [
    AppComponent,
    DialogComponent
  ],
  providers: [
    { 
      provide: ErrorHandler, useClass: GlobalErrorHandler 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
