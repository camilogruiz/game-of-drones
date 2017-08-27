import { Injectable } from '@angular/core';
import { Round } from './../models/round';
import { Move } from '../models/move';
import { User } from '../models/user';
import { Game } from '../models/game';
import { UserService } from './user.service';
import { GameService } from './game.service';
import { RoundService } from './round.service';

@Injectable()
export class PlayService {
  public scores: Round[] = [];
  public user1: User = new User();
  public user2: User = new User();
  public currentUser: string = null;
  public titleRound: string = null;
  public moves: Move[] = [];
  public winner: string;
  public count = 1;
  private moveUser1: Move;
  private moveUser2: Move;
  private countUser1 = 0;
  private countUser2 = 0;

  constructor(
    private userService: UserService,
    private gameService: GameService,
    private roundService: RoundService
  ) { }

  public nextRound() {
    if (this.currentUser == null || this.currentUser === this.user2.name) {
      this.currentUser = this.user1.name;
      this.titleRound = `ROUND ${this.count}`;
      this.count++;
    }
  }
  public nextMove(move: Move): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // 1. Cargar el nombre del player 2
      if (this.currentUser === this.user1.name) {
        this.moveUser1 = move;
        this.currentUser = this.user2.name;
      } else {
        // 2. Si el currentuser es player 2 validar el ganador
        this.moveUser2 = move;
        // 3. Llenar la lista de score
        // 4. Llamar a nextRound
        this.setMove().then(rta => resolve(rta));
      }
    });
  }

  private setMove(): Promise<boolean> {
    const score = new Round();
    score.name = this.titleRound;
    score.move = this.moves;
    score.createdDate = new Date().toString();
    score.moveUser1 = this.moveUser1;
    score.moveUser2 = this.moveUser2;
    return new Promise((resolve, reject) => {
      if (this.moveUser1.kill === this.moveUser2.move) {
        score.winUser = this.user1;
        this.countUser1++;
      } else if (this.moveUser2.kill === this.moveUser1.move) {
        score.winUser = this.user2;
        this.countUser2++;
      } else {
        score.winUser = null;
      }

      this.scores.push(score);

      if (this.countUser1 === 3 || this.countUser2 === 3) {
        if (this.countUser1 === 3) { this.winner = this.user1.name; }
        if (this.countUser2 === 3) { this.winner = this.user2.name; }
        this.save().then(rta => resolve(rta));
      } else {
        this.nextRound();
        resolve(false);
      }
    });
  }

  private cleanData() {
    this.scores = [];
    this.titleRound = null;
    this.moves = [];
    this.count = 1;
    this.countUser1 = 0;
    this.countUser2 = 0;
  }

  public save(): Promise<boolean> {
    const game = new Game();
    let count = 0;
    return new Promise((resolve, reject) => {
      this.userService.createUser(this.user1).then((user1: User) => {
        game.userID1 = user1._id;
        this.userService.createUser(this.user2).then((user2: User) => {
          game.userID2 = user2._id;
          // tslint:disable-next-line:no-shadowed-variable
          this.gameService.createGame(game).then((game: Game) => {
            this.scores.forEach(round => {
              // tslint:disable-next-line:no-shadowed-variable
              this.roundService.createRound(round).then((round: Round) => {
                count++;
                if (this.scores.length === count) {
                  this.cleanData();
                  resolve(true);
                }
              });
            });
          });
        });
      });
    });
  }
}
