import { Injectable } from "@angular/core";
import {
	AngularFirestore,
	AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RoleModel, UserModel } from "./UserModel";

@Injectable({
	providedIn: "root",
})
export class RegistrationService {
	constructor(public firestore: AngularFirestore) {}
	collectionNameForUser = "User";
	collectionNameForRole = "Roles";

	private itemsCollection: AngularFirestoreCollection<UserModel[]>;
	items: Observable<UserModel[]>;

	private itemsCollectionRole: AngularFirestoreCollection<RoleModel[]>;
	itemsRole: Observable<RoleModel[]>;

	createUser(user) {
		return this.firestore.collection(this.collectionNameForUser).add(user);
	}

	readUser(id) {
		this.itemsCollection = this.firestore.collection(
			"/" + this.collectionNameForUser,
			(ref) => ref.where("uid", "==", id)
		);
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

	readAllUser() {
		this.itemsCollection = this.firestore.collection<UserModel[]>(
			this.collectionNameForUser
		);

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
	updateUser(id, user) {
		this.firestore.doc(this.collectionNameForUser + "/" + id).update(user);
	}

	deleteUser(id, user) {
		//this.firestore.doc(this.collectionName + "/" + id).delete();
		this.firestore.doc(this.collectionNameForUser + "/" + id).update(user);
	}

	readAllRoles() {
		this.itemsCollectionRole = this.firestore.collection<RoleModel[]>(
			this.collectionNameForRole
		);

		this.itemsRole = this.itemsCollectionRole.snapshotChanges().pipe(
			map((actions) =>
				actions.map((a) => {
					const data = (a.payload.doc.data() as unknown) as RoleModel;
					const id = a.payload.doc.id;
					return { id, ...data };
				})
			)
		);
		return this.itemsRole;
	}
}
