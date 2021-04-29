import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { BrowseProviderComponent } from "./browse-provider/browse-provider.component";
import { GameComponent } from "./game/game.component";

const ROUTES: Routes = [
	{ path: "", component: HomeComponent },
	{ path: "browse/:id", component: BrowseProviderComponent },
	{ path: "game/:slug", component: GameComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(ROUTES, {
		// enableTracing: true
	})],
	exports: [RouterModule],
})
export class AppPagesRoutingModule {

}
