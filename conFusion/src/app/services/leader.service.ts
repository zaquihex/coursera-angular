import { Injectable } from '@angular/core';
import {LEADERS} from "../shared/leader";

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaderInfo()  {
    return LEADERS;
  }

  getLeaderExecutive()  {
    const executive = LEADERS.filter(lead => lead.designation === "Executive Chef");
    return executive.length > 0 ? executive[0] : null;
  }


}
