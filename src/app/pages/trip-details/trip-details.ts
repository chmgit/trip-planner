import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Trips, Trip } from '../../services/trips';

@Component({
  selector: 'app-trip-details',
  imports: [NgIf, RouterLink],
  templateUrl: './trip-details.html',
  styleUrl: './trip-details.css'
})
export class TripDetails {
  trip: Trip | null = null;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private tripsService: Trips
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.tripsService.getTripById(id).subscribe({
        next: (trip) => {
          this.trip = trip;
        },
        error: () => {
          this.errorMessage = 'שגיאה בטעינת פרטי הטיול';
        }
      });
    }
  }
}