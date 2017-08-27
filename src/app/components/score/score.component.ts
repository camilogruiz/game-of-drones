import { Component, OnInit } from '@angular/core';
import { PlayService } from '../../services/play.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  constructor(public playService: PlayService) { }

  ngOnInit() {
  }

}
