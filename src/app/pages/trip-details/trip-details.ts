import { Component, signal } from '@angular/core';
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
  trip = signal<Trip | null>(null);
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private tripsService: Trips
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    console.log('trip id from route:', id);

    if (id) {
      this.tripsService.getTripById(id).subscribe({
        next: (tripFromServer) => {
          console.log('trip from server:', tripFromServer);
          this.trip.set(tripFromServer);
        },
        error: (error) => {
          console.error('error loading trip:', error);
          this.errorMessage = 'שגיאה בטעינת פרטי הטיול';
        }
      });
    } else {
      this.errorMessage = 'לא נמצא מזהה טיול';
    }
  }
}