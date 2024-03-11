import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';
import * as moment from 'moment';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setData', () => {
    it('should set data in localStorage', () => {
      const key = 'testKey';
      const value = { name: 'testValue' };

      service.setData(key, value);

      expect(localStorage.getItem(key)).toEqual(JSON.stringify(value));
    });
  });

  describe('get', () => {
    it('should return filtered items for the selected month', () => {
      const key = 'testKey';
      const selectedMonth = moment('2021-01-01');
      const items = [
        { date: '2021-01-01', value: 'item1' },
        { date: '2021-01-02', value: 'item2' },
        { date: '2021-02-01', value: 'item3' },
      ];
      localStorage.setItem(key, JSON.stringify(items));

      const result = service.get(key, selectedMonth);

      expect(result).toEqual([{ date: '2021-01-01', value: 'item1' }, { date: '2021-01-02', value: 'item2' }]);
    });

    it('should return an empty array if no data is found', () => {
      const key = 'testeKey';
      const selectedMonth = moment('2021-01-01');
      
      localStorage.setItem(key, JSON.stringify([]));
      const result = service.get(key, selectedMonth);

      expect(result).toEqual([]);
    });
  });

  describe('getEntradas', () => {
    it('should return the sum of "entrada" values for the selected month', () => {
      const selectedMonth = moment('2021-01-01');
      const items = [
        { date: '2021-01-01', type: 'entrada', value: 10 },
        { date: '2021-01-02', type: 'entrada', value: 20 },
        { date: '2021-02-01', type: 'entrada', value: 30 },
      ];
      localStorage.setItem('data', JSON.stringify(items));

      const result = service.getEntradas(selectedMonth);

      expect(result).toEqual(30);
    });

    it('should return 0 if no data is found', () => {
      const selectedMonth = moment('2021-01-01');

      const result = service.getEntradas(selectedMonth);

      expect(result).toEqual(0);
    });
  });

  describe('getSaidas', () => {
    it('should return the sum of "saida" values for the selected month', () => {
      const selectedMonth = moment('2021-01-01');
      const items = [
        { date: '2021-01-01', type: 'saida', value: 10 },
        { date: '2021-01-02', type: 'saida', value: 20 },
        { date: '2021-02-01', type: 'saida', value: 30 },
      ];
      localStorage.setItem('data', JSON.stringify(items));

      const result = service.getSaidas(selectedMonth);

      expect(result).toEqual(30);
    });

    it('should return 0 if no data is found', () => {
      const selectedMonth = moment('2021-01-01');

      const result = service.getSaidas(selectedMonth);

      expect(result).toEqual(0);
    });
  });
});