import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-dashboard-component',
  imports: [],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css'
})
export class DashboardComponent implements OnInit {
  totalUsers: number = 0;
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUserCount();
  }

  loadUserCount(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.totalUsers = users.length;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.isLoading = false;
      }
    });
  }

  navigateToUsers(): void {
    this.router.navigate(['/users']);
  }
}

