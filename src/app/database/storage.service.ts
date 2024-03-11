import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setData(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string, selectedMonth: moment.Moment ) {
    const data = localStorage.getItem(key);
    if(data) {
      let items = JSON.parse(data);
      return items.filter((item: any) => moment(item.date).isSame(selectedMonth, 'month'));
    }
  }

  getEntradas(selectedMonth: moment.Moment) {
    const data = localStorage.getItem('data');
    if(data) {
      let items = JSON.parse(data);
      let initialValue = 0;
      return items
      .filter((item: any) => moment(item.date).isSame(selectedMonth, 'month') && item.type === 'entrada')
      .map((item: any) => item.value)
      .reduce((acc: number, crr:number) => acc + crr, initialValue);
    }else {
      return 0
    }
  }

  getSaidas(selectedMonth: moment.Moment) {
    const data = localStorage.getItem('data');
    if(data) {
      let items = JSON.parse(data);
      let initialValue = 0;
      return items
      .filter((item: any) => moment(item.date).isSame(selectedMonth, 'month') && item.type === 'saida')
      .map((item: any) => item.value)
      .reduce((acc: number, crr:number) => acc + crr, initialValue);
    }else {
      return 0
    }
  }

  add(item: any) {
    let data = localStorage.getItem('data');
    if(data) {
      let items  = JSON.parse(data);
      items.push(item);

      this.setData('data', items);
    }else {
      let items = [item];
      this.setData('data', items);
    }
  }

  update(index: number, item:any) {
    let data = localStorage.getItem('data');
    if(data) {
      let items  = JSON.parse(data);
      items[index] = item;
      this.setData('data', items);
    }else {
      return 
    }
  }


  delete(index: number) {
    let data = localStorage.getItem('data');
    if(data) {
      let items  = JSON.parse(data);
      items = items.filter((item: any, i: number) => i !== index);

      this.setData('data', items);
    }
  }

  
}
