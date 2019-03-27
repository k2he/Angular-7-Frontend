import { ModuleWithProviders, NgModule, Optional, SkipSelf  } from '@angular/core';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';

import { HttpSpinnerInterceptor } from './http-spinner-interceptor';
import { AuthenticationService } from '../api/authentication.service';
import { JwtInterceptor } from './jwt.interceptor';
import { LoadAuthGuard } from "./guard/load-auth-guard";
import { AdminGuard } from './guard/admin-guard';
import { PublicPageGuard } from "./guard/public-guard";
import { ActiveAuthGuard } from "./guard/active-auth-guard";
import { NewProjectCountService } from '../api/newprojectcount.service';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [
      CommonModule,
      RouterModule
  ],
  declarations: [
    SpinnerComponent
  ],
  exports: [
    SpinnerComponent
  ],
  providers: [
    // {
    //     provide: HTTP_INTERCEPTORS,
    //     useClass: HttpSpinnerInterceptor,
    //     multi: true,
    // },
    { 
        provide: HTTP_INTERCEPTORS, 
        useClass: JwtInterceptor, 
        multi: true 
    },
    AuthenticationService,
    LoadAuthGuard,
    PublicPageGuard,
    ActiveAuthGuard,
    AdminGuard,
    NewProjectCountService
  ],
})

export class CoreModule { 
    
    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
          throw new Error(
            'CoreModule is already loaded. Import it in the AppModule only');
        }
      }
}
