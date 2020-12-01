import { Component, OnInit, Inject } from '@angular/core';

import { baseURL} from '../shared/baseurl';

import { DISHES } from '../shared/dishes';
import { Dish } from '../shared/dish';
import {DishService} from "../services/dish.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  errMess: string;
  dishes: Dish[];
  selectedDish: Dish;
  baseURL: string = baseURL;

  //constructor(private dishService: DishService, @Inject('baseURL') private baseURL) { }
  constructor(private dishService: DishService) {

  }

  ngOnInit() {

    this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes,errmess => this.errMess = <any>errmess);
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }

}
