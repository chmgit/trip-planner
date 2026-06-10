import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  onSubmit(): void {
    this.auth.login(this.username, this.password).subscribe({
      next: (users) => {
        if (users.length > 0) {
          this.auth.setCurrentUser(users[0]);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'שם משתמש או סיסמה שגויים';
        }
      },
      error: () => {
        this.errorMessage = 'שגיאה בחיבור לשרת';
      }
    });
  }
}