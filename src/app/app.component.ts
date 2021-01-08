import { Component } from "@angular/core";
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { MenuController } from "@ionic/angular";

@Component({
	selector: "app-root",
	templateUrl: "app.component.html",
	styleUrls: ["app.component.scss"],
})
export class AppComponent {
	navigateAdmin = [];
	navigateUser = [];
	userName = "";
	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private menu: MenuController
	) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	ngOnInit() {
		var roleName = sessionStorage.getItem("RoleName");
		if (roleName !== undefined && roleName !== null) {
			this.userName = sessionStorage.getItem("UserName");
			this.sideMenu();
			if (roleName === "Admin") {
				this.openAdminMenu();
			} else if (roleName === "User") {
				this.openUserMenu();
			}
		} else {
			this.menu.enable(false, "admin");
			this.menu.enable(false, "user");
			this.userName = "";
		}
	}

	sideMenu() {
		this.navigateAdmin = [
			{
				title: "Dashboard",
				url: "dashboard",
				icon: "home",
			},
			{
				title: "Users",
				url: "user-management",
				icon: "accessibility",
			},
			{
				title: "Aata",
				url: "adminmenu",
				icon: "paw",
			},
			{
				title: "Logout",
				url: "logout",
				icon: "log-out",
			},
		];
		this.navigateUser = [
			{
				title: "Dashboard",
				url: "dashboard",
				icon: "home",
			},
			{
				title: "Users",
				url: "registration",
				icon: "accessibility",
			},
			{
				title: "Logout",
				url: "logout",
				icon: "log-out",
			},
		];
	}

	openAdminMenu() {
		this.menu.enable(false, "user");
		this.menu.enable(true, "admin");
	}

	openUserMenu() {
		this.menu.enable(false, "admin");
		this.menu.enable(true, "user");
	}

	logoutUser() {}
}
