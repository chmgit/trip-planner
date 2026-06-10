import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Trips, Trip } from '../../services/trips';

@Component({
  selector: 'app-trips-all',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './trips-all.html',
  styleUrl: './trips-all.css'
})
export class TripsAll {
  trips: Trip[] = [];
  errorMessage = '';

  constructor(private tripsService: Trips) {}

  ngOnInit(): void {
    this.tripsService.getTrips().subscribe({
      next: (trips) => {
        this.trips = trips;
      },
      error: () => {
        this.errorMessage = 'שגיאה בטעינת הטיולים';
      }
    });
  }
}