import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';

import { PROMOTIONS } from '../shared/promotions';
import {Dish} from '../shared/dish';

import { HttpClient } from '@angular/common/http';

import {baseURL} from '../shared/baseurl';
import {catchError} from 'rxjs/operators';

import { ProcessHTTPMsgService } from './process-httpmsg.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions').pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPromotion(id: string): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + `promotions?id=${id}`).pipe(catchError(this.processHTTPMsgService.handleError));
    // return this.http.get.filter((promo) => (promo.id === id))[0];
  }

  getFeaturedPromotion(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + `promotions?featured=true`).pipe(catchError(this.processHTTPMsgService.handleError));
    // return PROMOTIONS.filter((promotion) => promotion.featured)[0];
  }
}
