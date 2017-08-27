import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayService } from '../../services/play.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private player1: string = null;
  private player2: string = null;

  constructor(
    private router: Router,
    private playService: PlayService
  ) { }

  ngOnInit() {
  }

  startGame() {
    // TODO: Validaciones
    // tslint:disable-next-line:quotemark
    if (this.player1 === null || this.player2 === null || this.player1.trim() === "" || this.player2.trim() === "") {
      return;
    }
    this.playService.user1.name = this.player1;
    this.playService.user2.name = this.player2;
    this.router.navigate(['/game']);
  }
}
