import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(private firebase: FirebaseService) {}
  users: Array<User>;
  addUserForm: FormGroup;

  ngOnInit(): void {
    this.addUserForm = new FormGroup({
      firstname: new FormControl(),
      lastname: new FormControl(),
      email: new FormControl(),
    });
    this.getUsers();
  }

  addNewUser(): void {
    this.firebase.addUser({
      key: '',
      firstname: this.addUserForm.value.firstname,
      lastname: this.addUserForm.value.lastname,
      email: this.addUserForm.value.email,
    });
  }

  getUsers(): void {
    this.firebase
      .getUsersList()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            key: c.payload.key,
            data: c.payload.val(),
          }))
        )
      )
      .subscribe((data) => {
        this.users = data.map((r) => {
          return {
            key: r.key,
            firstname: r.data.firstname,
            lastname: r.data.lastname,
            email: r.data.email,
          };
        });
      });
  }
}
