import { HeaderDashboardComponent } from './header-dashboard.component';
import { PriceService } from 'src/app/services/price.service'; 
import { StorageService } from 'src/app/database/storage.service'; 
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { callback } from 'chart.js/dist/helpers/helpers.core';

describe('HeaderDashboardComponent', () => {
  let component: HeaderDashboardComponent;
  let quotesService: PriceService;
  let storageService: StorageService;
  let http: HttpClient

  beforeEach(() => {
    quotesService = new PriceService(http);
    storageService = new StorageService();
    component = new HeaderDashboardComponent(quotesService, storageService);
  });

  describe('ngOnInit', () => {
    it('should call loadQuotes method of quotesService', () => {
      spyOn(quotesService, 'loadQuotes');
      component.ngOnInit();
      expect(quotesService.loadQuotes).toHaveBeenCalled();
    });

    it('should subscribe to currencyQuotes and update quotes property', () => {
      const quotes = { USD: { price: 1, timestamp: 1625097600 } };
      spyOn(quotesService.currencyQuotes, 'subscribe').and.callFake((callback: any) => {
        callback(quotes);
      });
      component.ngOnInit();
      expect(component.quotes).toEqual(quotes);
    });
  });

  describe('getPriceQuotes', () => {
    it('should return the price of the first quote', () => {
      component.quotes = { USD: { price: 1, timestamp: 1625097600 } };
      expect(component.getPriceQuotes()).toBe(1);
    });

    it('should return undefined if quotes is empty', () => {
      component.quotes = {};
      expect(component.getPriceQuotes()).toBeUndefined();
    });
  });

  describe('getCurrencyUpdate', () => {
    it('should return the formatted date and time of the first quote', () => {
      component.quotes = { USD: { price: 1, timestamp: 1625097600 } };
      expect(component.getCurrencyUpdate()).toBe('01/07/2021 00:00');
    });

    it('should return undefined if quotes is empty', () => {
      component.quotes = {};
      expect(component.getCurrencyUpdate()).toBeUndefined();
    });
  });

  describe('getEntradas', () => {
    it('should call getEntradas method of storageService with selectedMonth', () => {
      spyOn(storageService, 'getEntradas');
      component.getEntradas();
      expect(storageService.getEntradas).toHaveBeenCalledWith(component.selectedMonth);
    });
  });

  describe('getSaidas', () => {
    it('should call getSaidas method of storageService with selectedMonth', () => {
      spyOn(storageService, 'getSaidas');
      component.getSaidas();
      expect(storageService.getSaidas).toHaveBeenCalledWith(component.selectedMonth);
    });
  });
});