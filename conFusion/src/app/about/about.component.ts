import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import {Lead} from "../shared/lead";


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaderInformation: Lead[];

  constructor(leaderService: LeaderService) {
    this.leaderInformation= leaderService.getLeaderInfo();

  }

  ngOnInit() {
  }

}
