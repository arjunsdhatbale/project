import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-user',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './user.html',
  styleUrl: './user.css'
})


export class UserComponent {
 
  userForm: FormGroup; 
    activeTab: 'create' | 'update' | 'view' | 'delete' = 'create';
    users: UserComponent[] = [];
    userName!: string;
    email!: string;
    id!: number;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ){

    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required],
    });
  }


  onSubmit(): void {

    if(this.userForm.valid){
      const userData: UserComponent = this.userForm.value;

      this.userService.saveUser(userData).subscribe({
        next: () => {
          alert('User registered successfully ! ');
          this.userForm.reset();
        },
        error: (error) => {
          console.error('Error registering user : ', error); 
          alert('Registration failed. Please try again . '); 
        }
      });
    } else{
      alert('Please fill out all fields correctrly .');
    }
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Failed to fetch users', err);
      }
    });
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        alert('User deleted');
        this.getAllUsers(); // Refresh
      },
      error: (err) => {
        console.error('Failed to delete user', err);
      }
    });
  }


}