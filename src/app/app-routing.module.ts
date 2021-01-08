import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{
		path: "home",
		loadChildren: () =>
			import("./home/home.module").then((m) => m.HomePageModule),
	},
	{
		path: "message/:id",
		loadChildren: () =>
			import("./view-message/view-message.module").then(
				(m) => m.ViewMessagePageModule
			),
	},
	{
		path: "",
		redirectTo: "login",
		pathMatch: "full",
	},
	{
		path: "verify-email",
		loadChildren: () =>
			import("./pages/verify-email/verify-email.module").then(
				(m) => m.VerifyEmailPageModule
			),
	},
	{
		path: "login",
		loadChildren: () =>
			import("./pages/login/login.module").then((m) => m.LoginPageModule),
	},
	{
		path: "dashboard",
		loadChildren: () =>
			import("./pages/dashboard/dashboard.module").then(
				(m) => m.DashboardPageModule
			),
	},
	{
		path: "registration",
		loadChildren: () =>
			import("./pages/registration/registration.module").then(
				(m) => m.RegistrationPageModule
			),
	},
	{
		path: "UserDashboard",
		loadChildren: () =>
			import("./pages/user-dashboard/user-dashboard.module").then(
				(m) => m.UserDashboardPageModule
			),
	},
  {
    path: 'user-management',
    loadChildren: () => import('./pages/user-management/user-management.module').then( m => m.UserManagementPageModule)
  },
  {
    path: 'user-add-update',
    loadChildren: () => import('./pages/user-add-update/user-add-update.module').then( m => m.UserAddUpdatePageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/logout/logout.module').then( m => m.LogoutPageModule)
  },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
