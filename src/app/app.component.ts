import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userForm!: FormGroup;
  registeredUsers: any[] = [];
  usersPerPage: number =3;
  currentPage: number = 1;
  editIndex: number | null = null;

  days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  years = [2020, 2021, 2022, 2023, 2024];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20),Validators.pattern('^[A-Za-z\\s]+$')]],
      lastName: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20),Validators.pattern('^[A-Za-z\\s]+$')]],
      dob: this.fb.group({
        day: [''],
        month: [''],
        year: ['']
      }),
      email: ['', [Validators.required, Validators.email]],
      gender: ['',Validators.required],
      address: ['',[Validators.required, Validators.pattern('^[A-Za-z\\s]+$')]],
      pincode: ['', (Validators.required)],
      state: ['',[Validators.required, Validators.pattern('^[A-Za-z\\s]+$')]],
      city: ['', [Validators.required, Validators.pattern('^[A-Za-z\\s]+$')]],
      country: ['', [Validators.required, Validators.pattern('^[A-Za-z\\s]+$')]],
      course: [''],
      hobbies: [''],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.editIndex !== null) {
        this.registeredUsers[this.editIndex] = this.userForm.value;
        this.editIndex = null;
      } else {
        this.registeredUsers.push(this.userForm.value);
      }
      this.userForm.reset();
    } else {
      console.log('Form is invalid');
      this.userForm.markAllAsTouched();
    }
  }
  

  deleteUser(index: number) {   
    this.registeredUsers.splice(index, 1);
  }

  editUser(index: number) {
    const user = this.registeredUsers[index];
    this.userForm.patchValue(user);
    this.editIndex = index;
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage * this.usersPerPage < this.registeredUsers.length) {
      this.currentPage++;
    }
  }
}
