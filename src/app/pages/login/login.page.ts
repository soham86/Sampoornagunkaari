import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/shared/authentication.service";
import { LoginService } from "./login.service";
import { RoleModel, UserModel } from "./UserModel";

@Component({
	selector: "app-login",
	templateUrl: "./login.page.html",
	styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
	userData: UserModel = new UserModel();
	roleData: RoleModel[];
	emailData: string = "gangavanesoham9595@gmail.com";
	passwordData: string = "Admin@123";

	constructor(
		public authService: AuthenticationService,
		public logService: LoginService,
		public router: Router
	) {
		this.logService.readAllRoles().subscribe((data: RoleModel[]) => {
			this.roleData = data;
		});
	}

	ngOnInit() {}
	logIn(email, password) {
		this.authService
			.SignIn(email.value, password.value)
			.then((res) => {
				if (res) {
					localStorage.setItem("user", JSON.stringify(res));
					JSON.parse(localStorage.getItem("user"));
				} else {
					localStorage.setItem("user", null);
					JSON.parse(localStorage.getItem("user"));
				}
				if (this.authService.isEmailVerified) {
					this.logService
						.readUser(res.user.uid)
						.subscribe((data: UserModel[]) => {
							this.userData = data[0];

							if (this.userData.IsDeleted) {
								window.alert(
									"You are no longer with Sampoorna Gunkaari Aata. Please Contact admin to add you again"
								);
								return false;
							} else {
								var RoleName = this.roleData.find(
									(x) => x.id === this.userData.RoleId
								).RoleName;
								sessionStorage.setItem("RoleName", RoleName);
								sessionStorage.setItem(
									"UserName",
									this.userData.FirstName + " " + this.userData.LastName
								);
								sessionStorage.setItem("UserId", this.userData.id);
								sessionStorage.setItem("UserEmail", this.userData.Email);
								if (RoleName === "Admin") {
									this.router.navigate(["dashboard"], { replaceUrl: true });
								} else {
									this.router.navigate(["UserDashboard"], { replaceUrl: true });
								}
							}
						});
				} else {
					window.alert("Email is not verified");
					return false;
				}
			})
			.catch((error) => {
				window.alert(error.message);
			});
	}

	redirectToRegister() {
		this.router.navigate(["registration"]);
	}
}
