import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayService } from '../../services/play.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private player1: string;
  private player2: string;

  constructor(
    private router: Router,
    private playService: PlayService
  ) { }

  ngOnInit() {
  }

  startGame() {
    // TODO: Validaciones
    if (this.player1 === '' || this.player2 === '') {
      return;
    }
    this.playService.user1.name = this.player1;
    this.playService.user2.name = this.player2;
    this.router.navigate(['/game']);
  }
}
