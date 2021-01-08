import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/shared/authentication.service";

@Component({
	selector: "app-logout",
	templateUrl: "./logout.page.html",
	styleUrls: ["./logout.page.scss"],
})
export class LogoutPage implements OnInit {
	constructor(
		public authService: AuthenticationService,
		public router: Router
	) {}

	ngOnInit() {
		if (sessionStorage.getItem("UserId") === null) {
			this.router.navigate(["login"], { replaceUrl: true });
			return false;
		}
		sessionStorage.clear();
		localStorage.clear();
		this.authService.SignOut();
		this.router.navigate(["login"]);
	}
}
