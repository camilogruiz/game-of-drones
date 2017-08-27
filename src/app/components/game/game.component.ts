import { Component, OnInit } from '@angular/core';
import { Move } from '../../models/move';
import { PlayService } from '../../services/play.service';
import { MoveService } from '../../services/move.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(
    private playService: PlayService,
    private moveService: MoveService
  ) { }

  ngOnInit() {
    this.playService.objPlay.currentUser = null;
    this.playService.count = 1;
  }

}
