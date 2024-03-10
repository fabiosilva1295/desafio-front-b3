import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor() { }

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
        {
          label: 'Carteira',
          value: 'wallet',
          router: '/wallet',
          icon: 'pi-wallet'
        }
      ]
    },
    {
      category: 'Configurações', 
      items: [
        {
          label: 'Tema',
          value: 'theme',
          router: '/theme',
          icon: 'pi-palette'
        }
      ]
    }
  ]

  ngOnInit(): void {
  }

}
