import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SidenavComponent } from './sidenav.component';
import { Menu } from 'src/app/models/menu';
import { of } from 'rxjs';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let titleService: Title;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SidenavComponent],
      providers: [Title],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    titleService = TestBed.inject(Title);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  describe('menuItems', () => {
    it('should have a category named "Geral"', () => {
      expect(component.menuItems.some((item) => item.category === 'Geral')).toBe(
        true
      );
    });

    it('should have an item with label "Dashboard"', () => {
      expect(
        component.menuItems.some((item) => item.items.some((subItem) => subItem.label === 'Dashboard'))
      ).toBe(true);
    });

    it('should have an item with value "dash"', () => {
      expect(
        component.menuItems.some((item) => item.items.some((subItem) => subItem.value === 'dash'))
      ).toBe(true);
    });

    it('should have an item with router "/dashboard"', () => {
      expect(
        component.menuItems.some((item) => item.items.some((subItem) => subItem.router === '/dashboard'))
      ).toBe(true);
    });

    it('should have an item with icon "pi-chart-pie"', () => {
      expect(
        component.menuItems.some((item) => item.items.some((subItem) => subItem.icon === 'pi-chart-pie'))
      ).toBe(true);
    });
  });
});