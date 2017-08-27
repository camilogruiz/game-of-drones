import { Move } from './../models/move';
import { User } from './../models/user';
import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { PlayService } from './play.service';

describe('PlayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [PlayService]
    });
  });

  it('should be created', inject([PlayService], (service: PlayService) => {
    expect(service).toBeTruthy();
  }));

  it('setDefaulToWin', inject([PlayService], (service: PlayService) => {
    let defaultToWin = service.getDefaulToWin();
    expect(defaultToWin).toBe(3);

    service.setDefaulToWin(-1);
    defaultToWin = service.getDefaulToWin();
    expect(defaultToWin).toBe(3);

    service.setDefaulToWin(0);
    defaultToWin = service.getDefaulToWin();
    expect(defaultToWin).toBe(3);

    service.setDefaulToWin(1);
    defaultToWin = service.getDefaulToWin();
    expect(defaultToWin).toBe(1);
  }));

  it('nextRound', inject([PlayService], (service: PlayService) => {
    service.objPlay.user1 = new User();
    service.objPlay.user1.name = 'TestUser1';
    service.nextRound();

    expect(service.objPlay.currentUser).toBe('TestUser1');
    expect(service.objPlay.titleRound).toBe('ROUND 1');
  }));

  it('nextMove', inject([PlayService], (service: PlayService) => {
    service.objPlay.user1 = new User();
    service.objPlay.user1.name = 'TestUser1';
    service.objPlay.user2 = new User();
    service.objPlay.user2.name = 'TestUser2user2';
    const m1 = new Move();
    m1.move = 'paper';
    m1.kill = 'rock';
    const m2 = new Move();
    m2.move = 'rock';
    m2.kill = 'scissors';
    const m3 = new Move();
    m3.move = 'scissors';
    m3.kill = 'paper';
    service.objPlay.moves.push(m1);
    service.objPlay.moves.push(m2);
    service.objPlay.moves.push(m3);
    service.setDefaulToWin(1);
    service.nextRound();

    const result1 = service.nextMove(service.objPlay.moves[0]);
    expect(result1).toBe(false);
    const result2 = service.nextMove(service.objPlay.moves[2]);
    expect(result2).toBe(true);
  }));

  it('tie', inject([PlayService], (service: PlayService) => {
    service.objPlay.user1 = new User();
    service.objPlay.user1.name = 'TestUser1';
    service.objPlay.user2 = new User();
    service.objPlay.user2.name = 'TestUser2user2';
    const m1 = new Move();
    m1.move = 'paper';
    m1.kill = 'rock';
    const m2 = new Move();
    m2.move = 'rock';
    m2.kill = 'scissors';
    const m3 = new Move();
    m3.move = 'scissors';
    m3.kill = 'paper';
    service.objPlay.moves.push(m1);
    service.objPlay.moves.push(m2);
    service.objPlay.moves.push(m3);
    service.setDefaulToWin(1);
    service.nextRound();

    const result1 = service.nextMove(service.objPlay.moves[0]);
    expect(result1).toBe(false);
    const result2 = service.nextMove(service.objPlay.moves[0]);
    expect(result2).toBe(false);
  }));
});
