import { Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Trips, Trip } from '../../services/trips';
import { Auth, User } from '../../services/auth';
import { Bookings, Booking } from '../../services/bookings';

@Component({
  selector: 'app-trip-details',
  imports: [NgIf, RouterLink, FormsModule],
  templateUrl: './trip-details.html',
  styleUrl: './trip-details.css'
})
export class TripDetails {
  trip = signal<Trip | null>(null);

  currentUser: User | null = null;
  numberOfPeople = 1;

  isAlreadyBooked = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private tripsService: Trips,
    private auth: Auth,
    private bookingsService: Bookings
  ) { }

  ngOnInit(): void {
    this.currentUser = this.auth.getCurrentUser();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.tripsService.getTripById(id).subscribe({
        next: (tripFromServer) => {
          this.trip.set(tripFromServer);

          if (this.currentUser) {
            this.checkIfAlreadyBooked(Number(this.currentUser.id), Number(tripFromServer.id));
          }
        },
        error: () => {
          this.errorMessage = 'שגיאה בטעינת פרטי הטיול';
        }
      });
    } else {
      this.errorMessage = 'לא נמצא מזהה טיול';
    }
  }

  checkIfAlreadyBooked(userId: number, tripId: number): void {
    this.bookingsService.getUserBookingForTrip(userId, tripId).subscribe({
      next: (booking) => {
        this.isAlreadyBooked = !!booking;
      },
      error: () => {
        this.errorMessage = 'שגיאה בבדיקת הרשמה קיימת';
      }
    });
  }

  registerToTrip(): void {
    const selectedTrip = this.trip();

    if (!this.currentUser || !selectedTrip) {
      this.errorMessage = 'משתמש או טיול לא נמצאו';
      return;
    }

    if (this.numberOfPeople < 1) {
      this.errorMessage = 'יש להזין כמות אנשים תקינה';
      return;
    }

    const newBooking: Booking = {
      userId: Number(this.currentUser.id),
      tripId: Number(selectedTrip.id),
      numberOfPeople: this.numberOfPeople
    };

    this.bookingsService.createBooking(newBooking).subscribe({
      next: () => {
        this.successMessage = 'נרשמת בהצלחה לטיול';
        this.errorMessage = '';
        this.isAlreadyBooked = true;
      },
      error: () => {
        this.errorMessage = 'שגיאה בהרשמה לטיול';
      }
    });
  }
}