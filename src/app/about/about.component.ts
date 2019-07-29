import { Component, OnInit, Inject } from '@angular/core';
import { LeaderService} from '../services/leader.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
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
