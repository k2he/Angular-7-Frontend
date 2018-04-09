import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule} from '@angular/material/sidenav';

import { CustomCurrencyPipe } from '../shared/pipes/custom-currency.pipe';
import { CustomCurrencyFormatterDirective } from '../shared/directives/custom-currency-formatter.directive';
import { SideNaviComponent } from '../side-navi/side-navi.component';

@NgModule({
  imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatSidenavModule,
  ],
  declarations: [
        CustomCurrencyPipe,
        CustomCurrencyFormatterDirective,
        SideNaviComponent,
  ],
  exports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatSidenavModule,
        
        CustomCurrencyPipe,
        CustomCurrencyFormatterDirective,
        FormsModule,
        RouterModule,
        SideNaviComponent,
   ]

})
export class SharedModule { }