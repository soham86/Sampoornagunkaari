import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/shared/authentication.service";
import { RegistrationService } from "./registration.service";
import { RoleModel, UserModel } from "./UserModel";

@Component({
	selector: "app-registration",
	templateUrl: "./registration.page.html",
	styleUrls: ["./registration.page.scss"],
})
export class RegistrationPage implements OnInit {
	userData: UserModel = new UserModel();
	roleData: RoleModel[];
	emailData: string = "";
	password: string = "";

	constructor(
		public authService: AuthenticationService,
		public regService: RegistrationService,
		public router: Router
	) {
		this.regService.readAllRoles().subscribe((data: RoleModel[]) => {
			this.roleData = data;
		});
	}

	ngOnInit() {
		this.emailData = "";
		this.password = "";
	}

	signUp(email, password) {
		this.authService
			.RegisterUser(email.value, password.value)
			.then((res) => {
				var data: UserModel = JSON.parse(localStorage.getItem("user"));
				this.userData = new UserModel();
				if (data !== null) {
					this.userData.CreatedBy = data.id;
				} else {
					this.userData.CreatedBy = res.user.uid;
				}
				this.userData.CreatedDate = new Date();

				this.userData.DeletedBy = "";
				this.userData.DeletedDate = new Date();
				this.userData.Email = email.value;
				this.userData.FirstName = "";
				this.userData.IsDeleted = false;
				this.userData.LastName = "";
				this.userData.PhoneNumber = "";
				this.userData.PhotoURL = "";
				var userRoleId = this.roleData.find((x) => x.RoleName === "User").id;
				this.userData.RoleId = userRoleId;
				this.userData.UpdatedBy = "";
				this.userData.UpdatedDate = new Date();
				this.userData.uid = res.user.uid;
				var finalData = JSON.parse(JSON.stringify(this.userData));
				this.regService.createUser(finalData).then((data: any) => {
					this.authService.SendVerificationMail();
				});

				this.router.navigate(["verify-email"]);
			})
			.catch((error) => {
				window.alert(error.message);
			});
	}

	redirectToLogin() {
		this.router.navigate(["login"]);
	}
}
