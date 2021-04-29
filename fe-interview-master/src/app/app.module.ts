import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';

import { NgxsModule } from '@ngxs/store';
import { AppState } from "./app.state";
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { AppComponent } from "./app.component";
import { AppPagesModule } from "./pages/pages.module";

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		FormsModule,
		CommonModule,
		HttpClientModule,
		RouterModule,
		BrowserModule,
		AppPagesModule,
		NgxsModule.forRoot([
			AppState
		]),
		NgxsReduxDevtoolsPluginModule.forRoot(),
		NgxsLoggerPluginModule.forRoot()
	],
	exports: [],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
