import { Injectable } from '@angular/core';
import {LEADERS} from "../shared/leader";
import {HttpClient} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {catchError} from 'rxjs/operators';

import { ProcessHTTPMsgService } from './process-httpmsg.service';
import {Observable} from 'rxjs';
import {Lead} from '../shared/lead';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaderInfo(): any {
    return this.http.get(baseURL + 'leaders').pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getLeaderExecutive() {
    return this.http.get(baseURL + `leaders?designation=Executive Chef`).pipe(catchError(this.processHTTPMsgService.handleError));
    // const executive = LEADERS.filter(lead => lead.designation === "Executive Chef");
    // return executive.length > 0 ? executive[0] : null;
  }


}
