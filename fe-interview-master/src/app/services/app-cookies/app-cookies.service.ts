import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AppCookiesService {
  // cookie name: last-five-games
  private cookieName: string;

  constructor(private cookieService: CookieService) {  
    this.cookieName = "last-five-games"; // hardcoded cookie name
  }

  AddGameInCookie(id: string|undefined) {
    if (id === undefined) { return; }
    let cookieParsedValue: string[] = [];
    // Get cookie 
    const cookieValue = this.cookieService.get(this.cookieName);
    // Parse
    if (cookieValue !== "") { // Empty cookie
      // Parse
      cookieParsedValue = JSON.parse(cookieValue);
      // Check if already in list
      if (cookieParsedValue.find(x => x === id)) { return; }
      // Remove older game/s from list
      if (cookieParsedValue.length >= 5) { 
        // Remove an item from the end of an array: https://alligator.io/js/push-pop-shift-unshift-array-methods/
        for (let i=0; i < (cookieParsedValue.length - 4); i++) { cookieParsedValue.pop(); }
      }
    }
    // Add new game id
    cookieParsedValue.unshift(id); // Add items to the beginning of an array
    console.log("COOKIE: " + cookieParsedValue);
    // Save Cookie
    this.cookieService.set(this.cookieName, JSON.stringify(cookieParsedValue));
  }

  GetLastFiveCookie(): string[] {
    // Get cookie 
    const cookieValue = this.cookieService.get(this.cookieName);
    // Parse
    if(cookieValue !== "") { // Empty cookie
      const cookieParsedValue = JSON.parse(cookieValue);
      return cookieParsedValue;
    }
    return [];
  }
}