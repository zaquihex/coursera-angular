import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import {Lead} from "../shared/lead";
import {Observable} from 'rxjs';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaderInformation: Lead[];

  constructor(private leaderService: LeaderService) {
  }

  ngOnInit() {

    this.leaderService.getLeaderInfo().subscribe(data => {
      this.leaderInformation = data;
    });
  }

}
