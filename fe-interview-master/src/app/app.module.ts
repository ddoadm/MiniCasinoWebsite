import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgxsModule } from "@ngxs/store";
import { AppState } from "./app.state";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { AppComponent } from "./app.component";
import { AppPagesModule } from "./pages/pages.module";
// Used for cookie saving
import { CookieService } from "ngx-cookie-service";
import { AppCookiesService } from "./services/app-cookies/app-cookies.service";
import { FooterComponent } from "./shared/footer/footer.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
	declarations: [
		AppComponent,
		FooterComponent,
		NavbarComponent
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
		FontAwesomeModule
	],
	providers: [CookieService, AppCookiesService],
	bootstrap: [AppComponent]
})
export class AppModule { }
