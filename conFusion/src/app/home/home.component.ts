import { Component, OnInit } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import {Lead} from "../shared/lead";
import {LeaderService} from "../services/leader.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Promise<Dish>;
  promotion: Promotion;
  leaderExecutive: Lead;

  constructor(private dishservice: DishService,
              private promotionservice: PromotionService, private leaderService: LeaderService ) { }

  ngOnInit() {
    this.dish = this.dishservice.getFeaturedDish();
    this.promotion = this.promotionservice.getFeaturedPromotion();
    this.leaderExecutive = this.leaderService.getLeaderExecutive();
  }

}
