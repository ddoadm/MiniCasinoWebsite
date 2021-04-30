import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subject, Subscription } from "rxjs";
import { GameMockClient, Game } from "../../shared";
import { AppCookiesService } from "../../services/app-cookies/app-cookies.service";

@Component({
    selector: "app-game",
    templateUrl: "./game.component.html",
    styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
    // gamesData$: Observable<Game>;
    slug = "";
    game: Game| undefined;

    gameFilterSubject = new Subject<string>();
    // Subscriptions
    gameFilterSubscription: Subscription;

    constructor(
      private router: Router, 
      private route: ActivatedRoute, 
      gameMockClient: GameMockClient, 
      private appCookieService: AppCookiesService) {
      
      // Pipe used to filter games
      this.gameFilterSubscription = this.gameFilterSubject.subscribe((slug: string) => {
          gameMockClient.getGameBySlug$(this.slug).subscribe((game: Game| undefined) => this.game = game);
          console.log(this.game);

          // Save cookie
          appCookieService.AddGameInCookie(this.game?.id);
        } 
      );
    }

    ngOnInit(): void {    
      // Filter Games
      // subscribe to the parameters observable
      this.route.paramMap.subscribe(params => {
        this.slug = params.get("slug") as string;
        this.gameFilterSubject.next(this.slug);
      })
    }

    ngOnDestroy() {
      // Unsubscribe
      this.gameFilterSubscription.unsubscribe();
    }  
}
