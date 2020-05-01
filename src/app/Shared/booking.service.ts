import { Injectable } from '@angular/core';

import{AngularFireDatabase,AngularFireList,AngularFireObject}from 'angularfire2/database';
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private firebase:AngularFireDatabase) { }
 BookingList:AngularFireList<any>;

 getBooking(){
    
  this.BookingList = this.firebase.list('bookings');
  return this.BookingList.snapshotChanges();
  // this.customerLists = this.firebase.list('customers');
  // return this.customerLists;
}
 insertbooking(booking) {
  this.BookingList.push({
    restaurant:booking.restaurant,
    bookingid:booking.bookingid,
    name: booking.name,
    table: booking.table,
    totalpeople: booking.totalpeople,
    date: booking.date,
    time:booking.time
  });
}
}
