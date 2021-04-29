import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged, take, map } from 'rxjs/operators';
import { GameFilterParams } from 'src/app/shared/client/game-filter-params.model';

import { Provider } from 'src/app/shared/client/provider.model';
import { GameMockClient, Game } from "../../shared";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  //gamesData$: Observable<Game>;
  slug: string = "";
  game: Game| undefined;

  gameFilterSubject = new Subject<string>();
  // Subscriptions
  gameFilterSubscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, gameMockClient: GameMockClient) {
    
    // Pipe used to filter games
    this.gameFilterSubscription = this.gameFilterSubject.subscribe((slug:string) => {
        gameMockClient.getGameBySlug$(this.slug).subscribe((game:Game| undefined) => this.game = game);
        console.log(this.game)
      } 
    )
   }

   ngOnInit(): void {    
    // Filter Games
    this.slug = this.route.snapshot.paramMap.get('slug') as string;
    this.gameFilterSubject.next(this.slug);
  }

  ngOnDestroy() {
    // Unsubscribe
    this.gameFilterSubscription.unsubscribe();
  }
  
}
