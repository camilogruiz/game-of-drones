import { Component, OnInit } from '@angular/core';
import { Round } from '../../models/round';
import { RoundService } from '../../services/round.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  private lstRounds: Round[] = [];

  constructor(private roundService: RoundService) { }

  ngOnInit() {
    this.roundService
      .getGroupRound()
      .then((round: Round[]) => {
        this.lstRounds = round;
      });
  }

}
