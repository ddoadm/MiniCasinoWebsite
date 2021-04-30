import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { ThumbComponent } from "../../shared/thumb/thumb.component";

import { GameMockClient, Game } from "../../shared";
import { Store } from '@ngxs/store';

const NAME_KEBAB = "app-home";

@Component({
	templateUrl: "./home.component.html",
	styleUrls: ["./home.scss"],
	host: { class: NAME_KEBAB },
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

	gamesData$: Observable<Game[]>;
	trendingGamesData$: Observable<Game[]>;
	hotGamesData$: Observable<Game[]>;

	constructor(
		gameMockClient: GameMockClient,
		store: Store
	) {
		// Observable
		this.gamesData$ = gameMockClient.getAll$();		
		this.trendingGamesData$ = this.gamesData$.pipe(
			map((games:Game[]) => games.filter(g=>g.tag === 'trending'))
		);
		this.hotGamesData$ = this.gamesData$.pipe(
			map((games:Game[]) => games.filter(g=>g.tag === 'hot'))
		);
		// To check out data in console
		//observer = this.trendingGamesData$.subscribe((x:Game[]) => console.log(x));		
	}
}
