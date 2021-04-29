import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { BrowseProviderComponent } from './browse-provider/browse-provider.component';
import { FormsModule } from '@angular/forms';
import { AppPagesRoutingModule } from "./pages-routing.module";
import { GameComponent } from './game/game.component';
import { ThumbComponent } from '../thumb/thumb.component';

const COMPONENTS = [
	HomeComponent
];

@NgModule({
	imports: [
		CommonModule,
		AppPagesRoutingModule,
		FormsModule
	],
	declarations: [
		...COMPONENTS, 
		BrowseProviderComponent,
		GameComponent,
		ThumbComponent
	],
	exports: [
		...COMPONENTS
	]
})
export class AppPagesModule {

}
