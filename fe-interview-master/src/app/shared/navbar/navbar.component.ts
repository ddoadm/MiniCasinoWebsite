import { Component } from "@angular/core";
import { faHome, faGamepad, faWater } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {
  faWater = faWater;
  faHome = faHome;
  faGamepad = faGamepad;
}
