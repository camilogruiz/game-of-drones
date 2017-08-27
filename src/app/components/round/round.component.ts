import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Move } from '../../models/move';
import { PlayService } from '../../services/play.service';
import { MoveService } from '../../services/move.service';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.css']
})
export class RoundComponent implements OnInit {
  @Input() lstMoves: Move[] = [];
  private move: any;

  constructor(
    private router: Router,
    public playService: PlayService,
    private moveService: MoveService
  ) { }

  ngOnInit() {
    this.playService.nextRound();
  }

  play(move: Move) {
    const m = this.playService.moves.filter(item => {
      return item._id === this.move;
    })[0];
    this.playService.nextMove(m).then(respose => {
      if (respose) {
        this.router.navigate(['/win']);
      }
    });

    this.move = '';
  }

}
