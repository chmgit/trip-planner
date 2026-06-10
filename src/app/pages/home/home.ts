import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Auth, User } from '../../services/auth';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  currentUser: User | null = null;

  constructor(
    private auth: Auth,
    private router: Router
  ) {
    this.currentUser = this.auth.getCurrentUser();

    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}