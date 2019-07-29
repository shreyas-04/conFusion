import { Component, OnInit, Inject } from '@angular/core';
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

  leadersErrMess: string;

  constructor(private leaderService: LeaderService, @Inject ('BaseURL') public BaseURL) { }

  ngOnInit() {
    this.leaderService.getLeaders()
    .subscribe ((leaders) => this.leaders = leaders,
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    errmess => this.leadersErrMess = <any> errmess);

  }

  onSelect(leader: Leader) {
    this.selectedLeader = leader;
  }


}
