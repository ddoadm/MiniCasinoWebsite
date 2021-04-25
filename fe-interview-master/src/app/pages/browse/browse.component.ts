import { Component, OnInit } from '@angular/core';
import { Observable, fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

import { GameMockClient, Game } from "../../shared";

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  gamesData$: Observable<Game[]>;
	filteredGamesData$: Observable<Game[]>;

  constructor(
		gameMockClient: GameMockClient
	) {
    const searchBox = document.getElementById('SearchBox');

    /*
    const typeahead = fromEvent(searchBox, 'input').pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      filter(text => text.length > 2),
      debounceTime(10),
      distinctUntilChanged(),
      switchMap(searchTerm => ajax(`/api/endpoint?search=${searchTerm}`))
    );
    */

		// Observable
		this.gamesData$ = gameMockClient.getAll$();
		
		this.filteredGamesData$ = this.gamesData$.pipe(
			map((games:Game[]) => games.filter(g=>g.tag === 'hot'))
		);
		// To check out data in console
		var observer = this.filteredGamesData$.subscribe((x:Game[]) => console.log(x));
		
	}

  ngOnInit(): void {
  }

}
