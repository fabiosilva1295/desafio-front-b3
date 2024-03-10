import { Component, OnInit } from '@angular/core';
import { LayoutType } from 'src/app/models/layout-types.enum';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  defaultLayout: number | string = LayoutType['B3A']

  constructor() { }

  ngOnInit(): void {
  }

}
