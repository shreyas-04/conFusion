import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { DISHES } from '../shared/dishes';
import { baseURL } from '../shared/baseurl';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';

import { MenuComponent } from './menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    const dishServiceStub = {
      getDishes: function(): Observable<Dish[]> {
        return of(DISHES);
      }
    };

    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        FlexLayoutModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatCheckboxModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatProgressSpinnerModule,
        MatSliderModule,
        HttpClientModule,
        MatCardModule,
        MatProgressSpinnerModule,
        RouterTestingModule.withRoutes([{ path: 'menu', component: MenuComponent }])
      ],
      declarations: [ MenuComponent, DishdetailComponent ],
      providers: [
        { provide: DishService, useValue: dishServiceStub },
        { provide: 'BaseURL', useValue: baseURL },
      ]
    })
    .compileComponents();

    const dishservice = TestBed.get(DishService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dishes items should be 4', () => {
    expect(component.dishes.length).toBe(4);
    expect(component.dishes[1].name).toBe('Zucchipakoda');
    expect(component.dishes[3].featured).toBeFalsy();
  });
});
