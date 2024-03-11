import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { StorageService } from 'src/app/database/storage.service';
import { PriceService } from 'src/app/services/price.service';

@Component({
  selector: 'app-header-dashboard',
  templateUrl: './header-dashboard.component.html',
  styleUrls: ['./header-dashboard.component.scss']
})
export class HeaderDashboardComponent implements OnInit {

  @Input() selectedMonth: moment.Moment = moment(new Date(Date.now()))

  constructor(
    public quotesService: PriceService,
    private storage: StorageService,
  ) { }

  quotes:any = {}
  ngOnInit(): void {
    this.quotesService.loadQuotes();
    this.quotesService.currencyQuotes.subscribe(res => this.quotes = res)
  }

  getPriceQuotes() {
    const [key] = Object.keys(this.quotes);
    return this.quotes[key].price
  }

  getCurrencyUpdate() {
    const [key] = Object.keys(this.quotes);
    return moment(new Date(this.quotes[key].timestamp * 1000)).format('DD/MM/YYYY HH:mm')
  }

  getEntradas() {
    return this.storage.getEntradas(this.selectedMonth);
  }

  getSaidas() {
    return this.storage.getSaidas(this.selectedMonth);
  }

}
