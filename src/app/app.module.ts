import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { HttpModule } from '@angular/http';
/** COMPONENTS */
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { GameComponent } from './components/game/game.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { RoundComponent } from './components/round/round.component';
import { ScoreComponent } from './components/score/score.component';
import { AppRoutingModule } from './app-routing.module';
import { RankingComponent } from './components/ranking/ranking.component';
/** SERVICES */
import { GameService } from './services/game.service';
import { MoveService } from './services/move.service';
import { RoundService } from './services/round.service';
import { PlayService } from './services/play.service';
import { ErrorHandlersService } from './handlers/error-handlers.service';
import { AboutComponent } from './components/about/about.component';
import { WinComponent } from './components/win/win.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    GameComponent,
    ConfigurationComponent,
    RoundComponent,
    ScoreComponent,
    RankingComponent,
    AboutComponent,
    WinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    MaterializeModule
  ],
  providers: [
    GameService,
    MoveService,
    RoundService,
    PlayService,
    ErrorHandlersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
