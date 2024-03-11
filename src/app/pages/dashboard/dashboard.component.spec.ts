import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { StorageService } from 'src/app/database/storage.service';
import { PriceService } from 'src/app/services/price.service';
import * as moment from 'moment';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let storageService: StorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule, InputTextModule, DropdownModule],
      providers: [StorageService, HttpClient, HttpHandler, PriceService, ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    storageService = TestBed.inject(StorageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call loadQuotes and getData', () => {
      spyOn(component.priceService, 'loadQuotes');
      spyOn(component, 'getData');

      component.ngOnInit();

      expect(component.priceService.loadQuotes).toHaveBeenCalled();
      expect(component.getData).toHaveBeenCalled();
    });
  });

  describe('getSelectedMonth', () => {
    it('should return the selected month and year', () => {
      component.selectedMonth = moment('2022-01-01');

      const result = component.getSelectedMonth();

      expect(result).toBe('Janeiro de 2022');
    });
  });

  describe('onPrev', () => {
    it('should subtract 1 month from selectedMonth and call getData', () => {
      spyOn(component, 'getData');

      component.onPrev();

      expect(component.selectedMonth.month()).toBe(moment().month() - 1);
      expect(component.getData).toHaveBeenCalled();
    });
  });

  describe('onNext', () => {
    it('should add 1 month to selectedMonth and call getData', () => {
      spyOn(component, 'getData');

      component.onNext();

      expect(component.selectedMonth.month()).toBe(moment().month() + 1);
      expect(component.getData).toHaveBeenCalled();
    });
  });

  describe('add', () => {
    it('should add the form value to storage and call getData', () => {
      spyOn(component.storage, 'add');
      spyOn(component, 'getData');

      component.form.patchValue({
        type: 'entrada',
        value: '100',
        description: 'Test',
        date: moment(),
      });
      component.add();

      expect(component.storage.add).toHaveBeenCalled()
      expect(component.getData).toHaveBeenCalled();
    });

    it('should mark the form as dirty if it is invalid', () => {
      spyOn(component.form, 'markAsDirty');
      spyOn(component.storage, 'add');
      spyOn(component, 'getData');

      component.form.patchValue({
        type: '',
        value: '',
        description: '',
        date: moment(),
      });
      component.add();

      expect(component.form.markAsDirty).toHaveBeenCalled();
      expect(component.storage.add).not.toHaveBeenCalled();
      expect(component.getData).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update the item in storage and call getData', () => {
      spyOn(component.storage, 'update');
      spyOn(component, 'getData');

      component.form.patchValue({
        type: 'entrada',
        value: '100',
        description: 'Test',
        date: moment(),
      });
      component.update(0);

      expect(component.storage.update).toHaveBeenCalled();
      expect(component.isEdit).toBe(false);
      expect(component.getData).toHaveBeenCalled();
    });

    it('should mark the form as dirty if it is invalid', () => {
      spyOn(component.form, 'markAsDirty');
      spyOn(component.storage, 'update');
      spyOn(component, 'getData');

      component.form.patchValue({
        type: '',
        value: '',
        description: '',
        date: moment(),
      });
      component.update(0);

      expect(component.form.markAsDirty).toHaveBeenCalled();
      expect(component.storage.update).not.toHaveBeenCalled();
      expect(component.getData).not.toHaveBeenCalled();
    });
  });

  describe('getItemsKey', () => {
    it('should return the keys in the specified order', () => {
      const item = {
        description: 'Test',
        type: 'entrada',
        value: 100,
        date: ''
      };

      const result = component.getItemsKey(item);

      expect(result).toEqual(['description', 'type', 'value']);
    });
  });

  describe('getFormatedDate', () => {
    it('should return the formatted date', () => {
      const date = moment('2022-01-01');

      const result = component.getFormatedDate(date);

      expect(result).toBe('01/01/2022');
    });
  });

  describe('getData', () => {
    it('should call storage.get and update the data property', () => {
      spyOn(component.storage, 'get').and.returnValue(['data']);
      component.selectedMonth = moment('2022-01-01');

      component.getData();

      expect(component.storage.get).toHaveBeenCalledWith('data', component.selectedMonth);
      expect(component.data).toEqual(['data']);
    });
  });

  describe('edit', () => {
    it('should set the form value and isEdit property', () => {
      const item = {
        description: 'Test',
        type: 'entrada',
        value: 100,
        date: ''
      };

      component.edit(item);

      expect(component.form.value).toEqual(item);
      expect(component.isEdit).toBe(true);
    });
  });

  describe('delete', () => {
    it('should call storage.delete and getData', () => {
      spyOn(component.storage, 'delete');
      spyOn(component, 'getData');

      component.delete(0);

      expect(component.storage.delete).toHaveBeenCalledWith(0);
      expect(component.getData).toHaveBeenCalled();
    });
  });
});