import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "app-user-management",
	templateUrl: "./user-management.page.html",
	styleUrls: ["./user-management.page.scss"],
})
export class UserManagementPage implements OnInit {
	constructor(public router: Router) {}

	ngOnInit() {
		if (sessionStorage.getItem("UserId") === null) {
			this.router.navigate(["login"], { replaceUrl: true });
			return false;
		}
	}
}
