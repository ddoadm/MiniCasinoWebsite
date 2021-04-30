import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { catchError, map, take, takeUntil, tap } from "rxjs/operators";
import { Game } from "./game.model";
import { Provider } from "./provider.model";
import { Store, Select } from "@ngxs/store";
import { AddGame } from "src/app/actions/app.actions";

@Injectable({
	providedIn: "root"
})
export class GameMockClient {

	private readonly dataURL = "assets/game.mock-data.json";
	private stateLoaded = false;

	constructor(
		private http: HttpClient,
		private store: Store
	) {
	}

	// State Functions
	setGames(games: Game[]) {
		games.forEach(game => {
			this.store.dispatch(new AddGame(game));
		});
	}
	/*
	stateLoaded():boolean {
		this.store.select(state => state.games.hasLoaded).pipe(
			take(1)).
			subscribe((hasLoaded:boolean) => {
				return stateLoaded;
			});
		return stateLoaded;
	}*/

	// Get Methods
	getAll$(): Observable<Game[]> {
		// Check if state has data		
		if (this.stateLoaded) {
			// Get from state
			console.log("Data from State!");
			return this.store.select(state => state.games.games);
		}
		// Get from http request
		console.log("Data from Api Request!");
		const games$ = this.http.get<Game[]>(this.dataURL);		
		// Save in state
		const finalise = new Subject();
		games$.pipe(takeUntil(finalise)).subscribe((x: Game[]) => {
			this.setGames(x);	// Need to dispose of the subscription	
			finalise.next();
  			finalise.complete();
		});
		this.stateLoaded = true;
		return games$;
	}

	getAllFiltered$(searchText: string, providerPathText: string): Observable<Game[]> {
		return this.getAll$().pipe(
			map((games: Game[]) => games.filter(
				(game: Game) => {
					if ((providerPathText === "all") || (convertToPath(game.providerName) === providerPathText)) {
						return true;
					}
					return false;
				}
			).filter(
				(game: Game) => game.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
			),
			catchError(this.handleError)
		);
	}

	getGameBySlug$(slug: string): Observable<Game|undefined> {
		return this.getAll$().pipe( map((games: Game[]) => games.find(game => game.slug === slug)),
		catchError(this.handleError));
	}

	// Preserving order
	getGameByIds$(ids: string[]): Observable<(Game | undefined)[]> {
		return this.getAll$().pipe( 
			map((games: Game[]) => 
				[(games.find((game: Game) => game.id === ids[0])),
				(games.find((game: Game) => game.id === ids[1])),
				(games.find((game: Game) => game.id === ids[2])),
				(games.find((game: Game) => game.id === ids[3])),
				(games.find((game: Game) => game.id === ids[4]))]
			)
		);
	}

	getProviders$(): Observable<Provider[]> {
		return this.getAll$().pipe(
			map((x: Game[]) => onlyUnique(x
			  	.map((g: Game) => g.providerName))
				  .map(s => ({
					name: s,
					path: convertToPath(s)
				  }))
			),
			catchError(this.handleError)
		);
	}

	getProvidersBasedOnSearch$(searchText: string): Observable<Provider[]> {
		return this.getAll$().pipe(
			map((x: Game[]) => onlyUnique(x
				.filter((game: Game) => game.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1) // Filter by SearchText
			  	.map((g: Game) => g.providerName))
				  .map(s => ({
					name: s,
					path: convertToPath(s)
				  }))
			),
			catchError(this.handleError)
		);
	}

	// Error Handling	
	handleError(handleError: any): import("rxjs").OperatorFunction<Game[], any> {
		throw new Error("Method not implemented.");
	}
}
function onlyUnique(values: string[]): string[] {
	return [... new Set(values)];
}
function convertToPath(value: string): string {
	return value.replace(/\s+/g, "").replace("'", "").toLowerCase();
}