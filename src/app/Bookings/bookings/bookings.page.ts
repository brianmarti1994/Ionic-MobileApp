import { Component, OnInit } from '@angular/core';
import{BookingService}from'src/app/Shared/booking.service';
import { booking } from 'src/app/Home/home/booking';
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  bookingArray: any = [];
  constructor(private BookingService:BookingService) { }

  ngOnInit() {
    this.BookingService.getBooking().subscribe(list =>{
      this.bookingArray = [];
      list.forEach( item => { 
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.bookingArray.push(a as booking)
      })
    });
  }

}
