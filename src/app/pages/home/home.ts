import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Auth, User } from '../../services/auth';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterOutlet, Header],
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