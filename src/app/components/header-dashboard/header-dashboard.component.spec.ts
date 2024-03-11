import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderDashboardComponent } from './header-dashboard.component';
import { PriceService } from 'src/app/services/price.service';
import { StorageService } from 'src/app/database/storage.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('HeaderDashboardComponent', () => {
  let component: HeaderDashboardComponent;
  let fixture: ComponentFixture<HeaderDashboardComponent>;
  let priceService: PriceService;
  let storageService: StorageService;
  let http: HttpClient

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderDashboardComponent],
      providers: [HttpClient, HttpHandler, PriceService, StorageService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderDashboardComponent);
    component = fixture.componentInstance;
    priceService = TestBed.inject(PriceService);
    storageService = TestBed.inject(StorageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  describe('getPriceQuotes', () => {
    it('should return the price from quotes', () => {
      component.quotes = { USD: { price: 1, timestamp: 1625097600 } };
      expect(component.getPriceQuotes()).toBe(1);
    });

    it('should return undefined if quotes is empty', () => {
      component.quotes = {price: '', timestamp:''};
      expect(component.getPriceQuotes()).toBeUndefined();
    });
  });

  describe('getCurrencyUpdate', () => {
    it('should return the formatted timestamp from quotes', () => {
      component.quotes = { USD: { price: 1, timestamp: 1625097600 } }; //1625097600
      expect(component.getCurrencyUpdate()).toBe('01/07/2021 00:00');
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