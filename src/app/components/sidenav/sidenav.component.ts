import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Menu } from 'src/app/models/menu';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) { }

  active = {
    indexCategory: 0,
    indexItem:0
  }

  menuItems: Menu[] = [
    {
      category: 'Geral',
      items: [
        {
          label: 'Dashboard',
          value: 'dash',
          router: '/dashboard',
          icon: 'pi-chart-pie'
        },
      ]
    },
  ]

  ngOnInit(): void {
  }

  getChild(route: ActivatedRoute): any {
    if(route.firstChild){
      return this.getChild(route.firstChild)
    }else {
      return this.activatedRoute
    }
  }
}
