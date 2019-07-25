import { Component, OnInit } from '@angular/core';
import { LeaderService} from '../services/leader.service';
import { Leader } from '../shared/leader';
import { flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  // // tslint:disable-next-line: no-host-metadata-property
  // host: {
  //   '[@flyInOut]': 'true',
  //   // tslint:disable-next-line: object-literal-key-quotes
  //   'style': 'display: block;'
  // },
  // animations: [
  //   flyInOut()
  // ]
})
export class AboutComponent implements OnInit {

  leaders: Leader[] ;

  selectedLeader: Leader;

  constructor(private leaderService: LeaderService) { }

  ngOnInit() {
    this.leaderService.getLeaders()
    .subscribe ((leaders) => this.leaders = leaders);
  }

  onSelect(leader: Leader) {
    this.selectedLeader = leader;
  }


}
