import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  // // tslint:disable-next-line: no-host-metadata-property
  // host: {
  //   '[@flyInOut]': 'true',
  //   // tslint:disable-next-line: object-literal-key-quotes
  //   'style': 'display: block;'
  // },
  // animations: [
  //   flyInOut()
  // ]
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMess: string;

  constructor(private dishService: DishService, @Inject('BaseURL') public BaseURL) { }

  ngOnInit() {
    this.dishService.getDishes()
    .subscribe ((dishes) => this.dishes = dishes,
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    errmess => this.errMess = <any> errmess);
  }

}
