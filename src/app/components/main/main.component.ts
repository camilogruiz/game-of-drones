import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Move } from '../../models/move';
import { PlayService } from '../../services/play.service';
import { MoveService } from '../../services/move.service';

import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  modalActions = new EventEmitter<string | MaterializeAction>();

  private player1: string = null;
  private player2: string = null;

  constructor(
    private router: Router,
    private playService: PlayService,
    private moveService: MoveService
  ) { }

  ngOnInit() {
    this.loadMoves();
  }

  private loadMoves() {
    this.moveService
      .getMoves()
      .then((moves: Move[]) => {
        this.playService.objPlay.moves = moves;
      });
  }

  private startGame() {
    // TODO: Validaciones
    // tslint:disable-next-line:quotemark
    if (this.player1 === null || this.player2 === null || this.player1.trim() === "" || this.player2.trim() === "") {
      this.openModal();
      return;
    }
    this.playService.objPlay.user1.name = this.player1;
    this.playService.objPlay.user2.name = this.player2;
    this.router.navigate(['/game']);
  }

  private openModal() {
    this.modalActions.emit({ action: 'modal', params: ['open'] });
  }
  private closeModal() {
    this.modalActions.emit({ action: 'modal', params: ['close'] });
  }
}
