import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { StorageService } from 'src/app/database/storage.service';
import { PriceService } from 'src/app/services/price.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    public priceService: PriceService,
    public storage: StorageService,
  ) {}

  selectedMonth = moment(new Date(Date.now()));
  isEdit: boolean = false;

  months = [
    'Janeiro', 
    'Fevereiro', 
    'Março', 
    'Abril', 
    'Maio', 
    'Junho', 
    'Julho', 
    'Agosto', 
    'Setembro', 
    'Outubro', 
    'Novembro', 
    'Dezembro'
  ];

  form: FormGroup = new FormGroup({
    type: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    date: new FormControl(''),
  })

  options: any[] = [
    {label: 'Entrada', value: 'entrada'},
    {label: 'Saída', value: 'saida'},
  ];

  data: any[] =  []

  ngOnInit(): void {
    this.priceService.loadQuotes()
    this.getData()
  }

  getSelectedMonth(){
    return `${this.months[this.selectedMonth.month() ]} de ${this.selectedMonth.year()}`
  }

  onPrev() {
    this.selectedMonth.subtract(1, 'month')
    this.getData()
  }
  onNext() {
    this.selectedMonth.add(1, 'month')
    this.getData()
  }

  add() {
    this.form.patchValue({date: moment(this.selectedMonth)});

    if(this.form.invalid) {
      this.form.markAsDirty()
      return
    }
    this.form.value.value = Number(this.form.value.value)
    this.storage.add(this.form.value);
    this.form.reset();
    this.getData()
  }

  update(index: number) {

    if(this.form.invalid) {
      this.form.markAsDirty()
      return
    }

    this.form.value.value = Number(this.form.value.value)
    this.storage.update(index, this.form.value);
    this.form.reset();
    this.isEdit = false;
    this.getData()
  }

  getItemsKey(item: any) {
    const keys: any[] = Object.keys(item);
    console.log(keys)
    const ordeBy = [];
    keys.pop()
    
    for(let i of keys) {
      if(i == 'type') ordeBy[1] = 'type'
      if(i == 'value') ordeBy[2] = 'value'
      if(i == 'description') ordeBy[0] = 'description'
    }
    
    return ordeBy
  }

  getFormatedDate(date: moment.Moment) {
    return date.format('DD/MM/YYYY')
  }

  getData() {
    this.data = this.storage.get('data', this.selectedMonth);
  }

  edit(item: any) {
    this.form.patchValue(item);
    this.isEdit = true;
  }

  delete(index: number) {
    this.storage.delete(index);
    this.getData()
  }
}
