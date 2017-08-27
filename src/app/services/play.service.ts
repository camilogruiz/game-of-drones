import { Injectable } from '@angular/core';
import { Play } from '../models/play';
import { Round } from './../models/round';
import { Move } from '../models/move';
import { User } from '../models/user';

@Injectable()
export class PlayService {
  public objPlay: Play = new Play();
  public count = 1;
  private moveUser1: Move;
  private moveUser2: Move;
  private countUser1 = 0;
  private countUser2 = 0;
  private defaulToWin = 3;

  constructor() { }

  public getDefaulToWin(): number {
    return this.defaulToWin;
  }
  public setDefaulToWin(value: number) {
    if (value > 0) {
      this.defaulToWin = value;
    }
  }

  public nextRound() {
    if (this.objPlay.currentUser == null || this.objPlay.currentUser === this.objPlay.user2.name) {
      this.objPlay.currentUser = this.objPlay.user1.name;
      this.objPlay.titleRound = `ROUND ${this.count}`;
      this.count++;
    }
  }
  public nextMove(move: Move): boolean {
    let resolve = false;
    // 1. Cargar el nombre del player 2
    if (this.objPlay.currentUser === this.objPlay.user1.name) {
      this.moveUser1 = move;
      this.objPlay.currentUser = this.objPlay.user2.name;
    } else {
      // 2. Si el currentuser es player 2 validar el ganador
      this.moveUser2 = move;
      // 3. Llenar la lista de score
      // 4. Llamar a nextRound
      resolve = this.setMove();
    }
    return resolve;
  }

  private setMove(): boolean {
    let resolve = false;
    const score = new Round();
    score.name = this.objPlay.titleRound;
    score.move = this.objPlay.moves;
    score.createdDate = new Date().toString();
    score.moveUser1 = this.moveUser1;
    score.moveUser2 = this.moveUser2;

    if (this.moveUser1.kill === this.moveUser2.move) {
      score.winUser = this.objPlay.user1;
      this.countUser1++;
    } else if (this.moveUser2.kill === this.moveUser1.move) {
      score.winUser = this.objPlay.user2;
      this.countUser2++;
    } else {
      score.winUser = null;
    }

    this.objPlay.scores.push(score);

    if (this.countUser1 === this.defaulToWin || this.countUser2 === this.defaulToWin) {
      if (this.countUser1 === this.defaulToWin) { this.objPlay.winner = this.objPlay.user1.name; }
      if (this.countUser2 === this.defaulToWin) { this.objPlay.winner = this.objPlay.user2.name; }
      resolve = true;
    } else {
      this.nextRound();
    }
    return resolve;
  }

  public cleanData() {
    this.objPlay.scores = [];
    this.objPlay.titleRound = null;
    this.objPlay.moves = [];
    this.count = 1;
    this.countUser1 = 0;
    this.countUser2 = 0;
  }
}
