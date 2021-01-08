import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "app-user-add-update",
	templateUrl: "./user-add-update.page.html",
	styleUrls: ["./user-add-update.page.scss"],
})
export class UserAddUpdatePage implements OnInit {
	constructor(public router: Router) {}

	ngOnInit() {
		if (sessionStorage.getItem("UserId") === null) {
			this.router.navigate(["login"], { replaceUrl: true });
			return false;
		}
	}
}
