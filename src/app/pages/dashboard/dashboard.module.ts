import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig, CurrencyMaskDirective, CurrencyMaskModule } from 'ng2-currency-mask';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';
import { register } from 'swiper/element'
import { SidebarModule } from 'primeng/sidebar';
import {ChartModule} from 'primeng/chart';
import { HeaderDashboardComponent } from 'src/app/components/header-dashboard/header-dashboard.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';




register()



export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
};


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CurrencyMaskModule,
    DividerModule,
    MenuModule,
    SidebarModule,
    ChartModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class DashboardModule { }
