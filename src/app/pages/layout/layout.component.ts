import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LayoutType } from 'src/app/models/layout-types.enum';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  visible: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.visible = !this.visible;
  }

}
