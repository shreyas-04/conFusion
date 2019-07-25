import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { Leader } from '../shared/leader';
import { Promotion } from '../shared/promotion';

import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess : string;

  constructor(private dishService: DishService,
              private promotionService: PromotionService,
              private leaderService: LeaderService,
              @Inject ('BaseURL') public BaseURL
              ) { }

  ngOnInit() {
    this.dishService.getFeaturedDish()
    .subscribe ((dish) => this.dish = dish,
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    errmess => this.dishErrMess = <any> errmess);
    this.promotionService.getFeaturedPromotion()
    .subscribe ((promotion) => this.promotion = promotion);
    this.leaderService.getFeaturedLeader()
    .subscribe ((leader) => this.leader = leader);
  }

}
