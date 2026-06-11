import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Booking {
    id?: string;
    userId: number;
    tripId: number;
    numberOfPeople: number;
}

@Injectable({
    providedIn: 'root'
})
export class Bookings {
    private apiUrl = 'http://localhost:3000/bookings';

    constructor(private http: HttpClient) { }

    getBookings(): Observable<Booking[]> {
        return this.http.get<Booking[]>(this.apiUrl);
    }

    createBooking(booking: Booking): Observable<Booking> {
        return this.http.post<Booking>(this.apiUrl, booking);
    }

    getUserBookingForTrip(userId: number, tripId: number): Observable<Booking | undefined> {
        return this.getBookings().pipe(
            map(bookings =>
                bookings.find(booking =>
                    booking.userId === userId && booking.tripId === tripId
                )
            )
        );
    }
}