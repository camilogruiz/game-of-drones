import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { GameComponent } from './components/game/game.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { WinComponent } from './components/win/win.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'game', component: GameComponent },
  { path: 'config', component: ConfigurationComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'win', component: WinComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
