import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

import {
	AngularFirestore,
	AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { UserModel } from "../registration/UserModel";

@Injectable({
	providedIn: "root",
})
export class DashboardService {
	constructor(public db: AngularFirestore) {}
	private itemsCollection: AngularFirestoreCollection<UserModel[]>;
	items: Observable<UserModel[]>;
	getAllUsers() {
		this.itemsCollection = this.db.collection<UserModel[]>("User");

		this.items = this.itemsCollection.snapshotChanges().pipe(
			map((actions) =>
				actions.map((a) => {
					const data = (a.payload.doc.data() as unknown) as UserModel;
					const id = a.payload.doc.id;
					return { id, ...data };
				})
			)
		);
		return this.items;
	}
}
