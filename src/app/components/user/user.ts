import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';



@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './user.html',
  styleUrls: ['./user.css']
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;
  users: UserComponent[] = [];
  activeTab: 'create' | 'view' = 'create';
  isLoading = false;
  selectedUser: User | null = null;
  deletingUserId: number | null = null;
  userName: any;
  email: any;
  password: any;
  id!: number;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchUsers();
  }

  initForm() {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  switchTab(tab: 'create' | 'view') {
    this.activeTab = tab;
    if (tab === 'create') {
      this.selectedUser = null;
      this.userForm.reset();
    }
  }

  fetchUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res) => (this.users = res),
      error: (err) => console.error(err)
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const payload: UserComponent = this.userForm.value;

    if (this.selectedUser?.id) {
      // Update existing user
      payload.id = this.selectedUser.id;
      this.userService.updateUser(payload).subscribe({
        next: () => {
          alert('User updated successfully!');
          this.fetchUsers();
          this.userForm.reset();
          this.selectedUser = null;
          this.activeTab = 'view';
        },
        error: (err) => console.error(err),
        complete: () => (this.isLoading = false)
      });
    } else {
      // Create new user
      this.userService.saveUser(payload).subscribe({
        next: () => {
          alert('User saved successfully!');
          this.fetchUsers();
          this.userForm.reset();
        },
        error: (err) => console.error(err),
        complete: () => (this.isLoading = false)
      });
    }
  }

 editUser(user: User) {
    this.selectedUser = { ...user };
    this.userForm.patchValue({
      userName: user.userName,
      email: user.email,
      password: user.password
    });
    this.activeTab = 'create';
  }

  deleteUser(id: number | undefined): void {
    if (!id) {
      console.error('User ID is undefined');
      return;
    }

    if (confirm('Are you sure you want to delete this user?')) {
      this.deletingUserId = id; // Set loading state
      
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.id !== id);
          this.deletingUserId = null;
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          this.deletingUserId = null;
          
          if (err.status === 404) {
            alert('User not found.');
          } else {
            alert('Failed to delete user. Please try again.');
          }
          
          this.fetchUsers();
        }
      });
    }
  }

}
