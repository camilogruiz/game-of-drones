import { Component, OnInit } from '@angular/core';
import { MoveService } from '../../services/move.service';
import { Move } from './../../models/move';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  private lstMoves: Move[] = [];
  private selectedMove: Move;
  private isNew: boolean;
  constructor(private moveService: MoveService) { }

  ngOnInit() {
    this.moveService
      .getMoves()
      .then((moves: Move[]) => {
        this.lstMoves = moves;
      });
    this.initMove();
  }

  initMove() {
    const move: Move = {
      move: '',
      kill: ''
    };
    this.selectMove(move, true);
  }

  selectMove(move: Move, isnew: boolean) {
    this.selectedMove = move;
    this.isNew = isnew;
  }

  saveMove() {
    if (this.isNew) {
      this.createMove();
    } else {
      this.updateMove();
    }
  }

  validateForm(): boolean {
    if (this.selectedMove.move === '') {
      return false;
    }
    if (this.selectedMove.kill === '') {
      return false;
    }
    return true;
  }

  createMove = () => {
    // tslint:disable-next-line:curly
    if (!this.validateForm()) return;
    this.moveService.createMove(this.selectedMove).then((objMove: Move) => {
      this.lstMoves.push(objMove);
      this.initMove();
    });
  }

  updateMove = () => {
    // tslint:disable-next-line:curly
    if (!this.validateForm()) return;
    this.moveService.updateMove(this.selectedMove).then((objMove: Move) => {
      const idx = this.getIndexOfMove(objMove._id);
      if (idx !== -1) {
        this.lstMoves[idx] = objMove;
        this.initMove();
      }
    });
  }

  deleteMove = (move: Move) => {
    this.moveService.deleteMove(move._id).then((objId: String) => {
      const idx = this.getIndexOfMove(objId);
      if (idx !== -1) {
        this.lstMoves.splice(idx, 1);
        this.selectMove(null, true);
      }
    });
  }

  private getIndexOfMove = (objId: String) => {
    return this.lstMoves.findIndex(move => {
      return move._id === objId;
    });
  }

}
