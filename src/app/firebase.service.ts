import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private db: AngularFireDatabase) {}
  usersRef: AngularFireList<User>;
  userRef: AngularFireObject<User>;

  getUsersList(): AngularFireList<User> {
    this.usersRef = this.db.list('users-list');
    return this.usersRef;
  }

  addUser(user: User): void {
    this.usersRef
      .push({
        key: user.key,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      })
      .then(() => console.log('User added'));
  }
}
