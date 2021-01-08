import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/shared/authentication.service";
import { User } from "src/shared/user";
import { UserModel } from "../registration/UserModel";
import { DashboardService } from "./dashboard.service";

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.page.html",
	styleUrls: ["./dashboard.page.scss"],
})
export class DashboardPage implements OnInit {
	userData: UserModel[];

	constructor(
		public dashboardService: DashboardService,
		public authService: AuthenticationService,
		public router: Router
	) {}

	ngOnInit() {
		if (sessionStorage.getItem("UserId") === null) {
			this.router.navigate(["login"], { replaceUrl: true });
			return false;
		} else {
			if (sessionStorage.getItem("reload") === null) {
				location.reload();
				sessionStorage.setItem("reload", "Yes");
			}
		}
		this.dashboardService.getAllUsers().subscribe((data: UserModel[]) => {
			this.userData = data;
			console.log(data);
		});
	}
}
