import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import{FormControl,FormGroup}from '@angular/forms';
import{BookingService}from'src/app/Shared/booking.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  codeGenerated: string;
 


  constructor(public alertController: AlertController,private BookingService:BookingService) { }

  ngOnInit() {
    this.BookingService.getBooking();

  }

  async presentAlertPrompt(resturant) {
    this.randomString();
    const alert = await this.alertController.create({
      header: 'Book '+ resturant,
      inputs: [
       
        {
          name: 'name',
          type: 'text',
          placeholder: 'Customer Name'
        },
        {
          name: 'tableno',
          type: 'number',
          id: 'name2-id',
          placeholder: 'Table No 1-8',
          max: 8
        },
        // multiline input.
        {
          name: 'people',
          id: 'people',
          type: 'number',
          max: 10,
          placeholder: 'Total People'
        },
        // input date with min & max
        {
          name: 'date',
          type: 'date'
        }
        ,
        // input date with min & max
        {
          name: 'time',
          type: 'time',
          placeholder: 'Time'
          
        }
        // input date without min nor max
        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
         
          handler: data =>{
             const form = new FormGroup({
              $key:new FormControl(null),
              restaurant:new FormControl(resturant),
              bookingid:new FormControl(this.codeGenerated),
              name:new FormControl(data.name),
              table:new FormControl(data.tableno),
              totalpeople:new FormControl(data.people),
              date:new FormControl(data.date),
              time:new FormControl(data.time)
            })
            this.BookingService.insertbooking(form.value);
             this.presentAlert(this.codeGenerated);
           
            
            
          }
        }]
    });


    await alert.present();
  }
  async presentAlert(id) {
  
    const alert = await this.alertController.create({
      header: 'Thank You',
      subHeader: '',
      message: 'Booking Id : '+id,
      buttons: ['OK']
    });

    await alert.present();
  }
  randomString() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    const stringLength = 10;
    let randomstring = '';
    for (let i = 0; i < stringLength; i++) {
    const rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
   }
    this.codeGenerated = randomstring;
    return 0;
   }
}
