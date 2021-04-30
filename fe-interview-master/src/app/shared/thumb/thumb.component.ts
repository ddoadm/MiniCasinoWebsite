import { Component, Input } from '@angular/core';
import { Game } from '../client/game.model';

@Component({
  selector: 'app-thumb',
  templateUrl: './thumb.component.html',
  styleUrls: ['./thumb.component.scss']
})
export class ThumbComponent {
  @Input('game') game: Game = <Game>{};

  constructor() {
    
   }

}
