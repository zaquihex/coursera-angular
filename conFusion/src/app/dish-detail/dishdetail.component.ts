import {Component, Input, OnInit} from '@angular/core';
import { Dish } from '../shared/dish';

import { baseURL } from '../shared/baseurl';

import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';

import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dish-detail.component.scss'],
  animations: [
    trigger('visibility', [
      state('shown', style({
        transform: 'scale(1.0)',
        opacity: 1
      })),
      state('hidden', style({
        transform: 'scale(0.5)',
        opacity: 0
      })),
      transition('* => *', animate('0.5s ease-in-out'))
    ])
  ]
})
export class DishdetailComponent implements OnInit {

  dish;
  dishcopy: Dish;
  errMess: string;
  dishIds: string[];
  baseURL: string = baseURL;
  prev: string;
  next: string;
  formComment: FormGroup;
  visibility = 'shown';
  value:number;
  formErrors: {
    author: boolean,
    comment: boolean,
  }

  constructor(private dishservice: DishService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder) {
    this.formComment = this.fb.group({
      rating: 5,
      comment: ['', [Validators.required]],
      author: ['', [Validators.required, Validators.minLength(2)]],
      date: new Date().getFullYear().toString()
    });

    this.formErrors = {
      author: false,
      comment: false,
    };
    this.formComment.valueChanges.subscribe(data => this.valueChanges(data));
  }

  valueChanges(data?: any) {
    if(data.author.length < 2) {
      this.formErrors.author = true;
    }
    if(data.comment.length === 0) {
      this.formErrors.comment = true;
    }

  }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => {
        this.dish = dish;
        this.setPrevNext(dish.id); },
        errmess => this.errMess = <any>errmess ));

    this.value = 2;

    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); }))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
      errmess => this.errMess = <any>errmess);
  }

  formSubmitted(formInfo: Object) {
    this.dish.comments.push(this.formComment.value);

    this.dishcopy.comments.push(this.formComment.value);
    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
          this.dish = dish; this.dishcopy = dish;
        },
        errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });

    this.formComment.reset({
      author: '',
      rating: 5,
      comment: '',
      date: ''
    });
    this.formErrors.author = false;
    this.formErrors.comment = false;


  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

}
