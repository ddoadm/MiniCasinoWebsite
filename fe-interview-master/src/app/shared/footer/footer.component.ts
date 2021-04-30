import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { AppCookiesService } from "../../services/app-cookies/app-cookies.service";
import { GameMockClient, Game } from "../../shared";
import { ThumbComponent } from "../thumb/thumb.component";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent {
  ids: string[];
  gamesData$: Observable<(Game|undefined)[]>;

  constructor(gameMockClient: GameMockClient, appCookiesService: AppCookiesService) {
    this.ids = appCookiesService.GetLastFiveCookie();
    this.gamesData$ = gameMockClient.getGameByIds$(this.ids);
  }
}
