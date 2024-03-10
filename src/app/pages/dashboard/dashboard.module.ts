import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CurrencyMaskConfig, CurrencyMaskDirective, CurrencyMaskModule } from 'ng2-currency-mask';
import { DividerModule } from 'primeng/divider';
import { TableComponent } from 'src/app/components/table/table.component';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};


@NgModule({
  declarations: [
    DashboardComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CurrencyMaskModule,
    DividerModule,
    
  ],
  providers: [
    CurrencyMaskDirective
  ]
})
export class DashboardModule { }
