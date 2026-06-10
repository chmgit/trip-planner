import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Home } from './pages/home/home';
import { TripsAll } from './pages/trips-all/trips-all';
import { TripsMy } from './pages/trips-my/trips-my';
import { TripDetails } from './pages/trip-details/trip-details';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },
  { path: 'register', component: Register },

  {
    path: 'home',
    component: Home,
    children: [
      { path: '', redirectTo: 'trips-all', pathMatch: 'full' },
      { path: 'trips-all', component: TripsAll },
      { path: 'trips-my', component: TripsMy },
      { path: 'trip/:id', component: TripDetails }
    ]
  }
];