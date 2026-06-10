import { Component, signal } from '@angular/core';
import { NgFor, NgIf, JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Trips, Trip } from '../../services/trips';

@Component({
  selector: 'app-trips-all',
  imports: [NgFor, NgIf, RouterLink, JsonPipe],
  templateUrl: './trips-all.html',
  styleUrl: './trips-all.css'
})
export class TripsAll {
  trips = signal<Trip[]>([]);
  errorMessage = '';

  constructor(private tripsService: Trips) { }

  ngOnInit(): void {
    this.tripsService.getTrips().subscribe({
      next: (tripsFromServer) => {
        console.log('trips from server:', tripsFromServer);

        this.trips.set(tripsFromServer);

        console.log('trips inside signal:', this.trips());
      },
      error: (error) => {
        console.error('error loading trips:', error);
        this.errorMessage = 'שגיאה בטעינת הטיולים';
      }
    });
  }
}