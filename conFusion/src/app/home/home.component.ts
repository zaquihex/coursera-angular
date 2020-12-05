import { Component, OnInit } from '@angular/core';

import { baseURL } from '../shared/baseurl';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import {Lead} from "../shared/lead";
import {LeaderService} from "../services/leader.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  baseUrl: string;
  dish: Dish;
  promotion: Promotion;
  leaderExecutive: Lead;

  constructor(private dishservice: DishService,
              private promotionservice: PromotionService, private leaderService: LeaderService ) {
  }

  ngOnInit() {
    this.baseUrl = baseURL;
    this.dishservice.getFeaturedDish().subscribe(dishFeature => {
      this.dish = dishFeature
    });
    this.promotionservice.getFeaturedPromotion().subscribe(data => {
      this.promotion = data[0]
    });
    this.leaderService.getLeaderExecutive().subscribe(data => {
      this.leaderExecutive = data[0]
    });
  }

}
