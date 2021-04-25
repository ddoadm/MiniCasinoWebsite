import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { BrowseComponent } from "./browse/browse.component";

import { AppPagesRoutingModule } from "./pages-routing.module";

const COMPONENTS = [
	HomeComponent,
	BrowseComponent
];

@NgModule({
	imports: [
		CommonModule,
		AppPagesRoutingModule,
	],
	declarations: [
		...COMPONENTS
	],
	exports: [
		...COMPONENTS
	]
})
export class AppPagesModule {

}
