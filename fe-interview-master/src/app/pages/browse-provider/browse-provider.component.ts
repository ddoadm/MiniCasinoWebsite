import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { GameFilterParams } from 'src/app/shared/client/game-filter-params.model';

import { Provider } from 'src/app/shared/client/provider.model';
import { GameMockClient, Game } from "../../shared";


@Component({
  selector: 'app-browse-provider',
  templateUrl: './browse-provider.component.html',
  styleUrls: ['./browse-provider.component.scss']
})
export class BrowseProviderComponent implements OnInit {
  gamesData$: Observable<Game[]>;
  providers$: Observable<Provider[]>;
  gameFilterSubject = new Subject<GameFilterParams>();
  gameFilterParams:GameFilterParams = {
    searchText: "",
    selectedProvider: ""
  };
  providerFilterSubject = new Subject<string>();

  // Subscriptions
  gameFilterSubscription: Subscription;
  providerFilterSubscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, gameMockClient: GameMockClient) {
		this.gamesData$ = gameMockClient.getAllFiltered$(this.gameFilterParams.searchText, this.gameFilterParams.selectedProvider);
    this.providers$ = gameMockClient.getProviders$();
    
    // Pipe used to filter games
    this.gameFilterSubscription = this.gameFilterSubject.pipe(
      debounceTime(500), // Debounce used instead of throttleTime(500)
    ).subscribe((params: GameFilterParams) => {
        this.gamesData$ = gameMockClient.getAllFiltered$(params.searchText, params.selectedProvider)
      } 
    )

    // Pipe used to filter provider selection based on search field
    this.providerFilterSubscription = this.providerFilterSubject.pipe(
      debounceTime(500), // Debounce used instead of throttleTime(500)
      distinctUntilChanged()
    ).subscribe(searchText => {
        this.providers$ = gameMockClient.getProvidersBasedOnSearch$(searchText)
      } 
    )
  }

  ngOnInit(): void {    
    // Filter Games
    this.gameFilterParams.selectedProvider = this.route.snapshot.paramMap.get('id') as string;
    this.gameFilterSubject.next(this.gameFilterParams);
  }

  ngOnDestroy() {
    // Unsubscribe
    this.gameFilterSubscription.unsubscribe();
    this.providerFilterSubscription.unsubscribe();
  }
  
  // Navigate to Browse-Component
  selectedProviderChange(providerPath:string){
    this.router.navigate(['/browse', providerPath]);

    // Filter Games
    this.gameFilterParams.selectedProvider = providerPath;
    this.gameFilterSubject.next(this.gameFilterParams);
  }

  // Search field update. Pass new searchText in searchTextUpdate pipe
  onKeyUpEvent(event: any){
    // Filter Games
    this.gameFilterParams.searchText = event.target.value;
    this.gameFilterSubject.next(this.gameFilterParams);

    // Filter Providers
    this.providerFilterSubject.next(event.target.value);
  }
}
