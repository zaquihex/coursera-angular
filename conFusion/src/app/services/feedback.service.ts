import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs';
import {Dish} from '../shared/dish';
import {baseURL} from '../shared/baseurl';
import {catchError} from 'rxjs/operators';
import {Feedback} from '../shared/feedback';

import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  postFeedback(feedbackInfo: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL + 'feedback', feedbackInfo, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

}
