import { Component, OnInit } from '@angular/core';
import { PlayService } from '../../services/play.service';

@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  styleUrls: ['./win.component.css']
})
export class WinComponent implements OnInit {

  private winner: string;

  constructor(private playService: PlayService) { }

  ngOnInit() {
  }

}
