import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CarAllInfo } from '../../types';
import { CommonModule} from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ContentfulService } from '../../services/contentful.service';
import { FormsModule } from '@angular/forms';
//import { carsAllInfo, getCarById } from '../../fake-data';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent implements OnInit, OnDestroy{
  id!:string;
  allCars$!:Observable<CarAllInfo[]>; 
  currentCar$!:Observable<CarAllInfo>; 
  currentCar!:CarAllInfo;  
  currentCarSub!:Subscription; 
  numberDays:number=1; 
  priceDay:number=0; 
  priceAllDays:number=0;  
  totalPrice:number=0; 
  negotiable:boolean=false; 
  //Date format
  startDate!:any;  
  endDate!:any; 
  // 'dd-mm-yyyy' format
  pickupDate!:any;
  dropoffDate!:any;
  today = new Date();
  initial:any; 
  startTime!:string;
  endTime!:string;  

  // name!:string;
  // email!:string; 
  // phone!:string; 
  // message!:string;

  assurance: boolean = false;

  
  constructor(private route:ActivatedRoute, 
    private titleService:Title, 
    private router: Router,
    private contentful:ContentfulService){ }

  ngOnInit(): void {
    this.titleService.setTitle('Rezervari | Eurotour - Inchirieri masini Cluj-Napoca')
    this.route.params.subscribe(param => this.id = param['id']); 

    
    
    this.setTheCar(); 
    this.setTheDate();
    
  }

  
  
  setTheCar():void{
    this.allCars$ = this.contentful.carsAllInfo$;
    this.currentCar$ = this.contentful.getCarById(this.id); 
    this.currentCarSub = this.currentCar$.subscribe(value => this.currentCar = value);
  }

  setTheDate(){
    this.startDate = new Date (this.today); 
    this.endDate = new Date(this.today); 
    this.endDate.setDate(this.today.getDate() + 1);
    this.pickupDate = this.startDate.toISOString().split('T')[0];
    this.dropoffDate = this.endDate.toISOString().split('T')[0];
  }

  carSelect(id:string){
    // this.currentCarSub.unsubscribe();
    // this.currentCarSub = 
    this.contentful.getCarById(id).subscribe(value => {
      this.currentCar = value; 
      this.updatePrices();
    });
     
  }

  firstDate(pickup:string):void{
    this.startDate = new Date(pickup);
    this.calculateDays();  
    this.updatePrices();
  }
  lastDate(dropoff:string):void{
    this.endDate = new Date(dropoff); 
    this.calculateDays(); 
    this.updatePrices();
  }

  firstTime(time:string){
    this.startTime = time;
    this.calculateDays();
  }
  lastTime(time:string){
    this.endTime = time;
    this.calculateDays();
  }
  calculateDays():void{
    let time = this.endDate - this.startDate; 
    this.numberDays = Math.ceil(time / (1000 * 60 * 60 * 24)); 
    if (this.startTime < this.endTime) 
      this.numberDays++;
    this.updatePrices();
  }

  updatePrices(){
    if(this.numberDays < 4) this.priceDay = this.currentCar.price[0].dayOneThree
    else if (this.numberDays < 8) this.priceDay = this.currentCar.price[1].dayFourSeven
    else if (this.numberDays > 8) this.priceDay = this.currentCar.price[2].dayEightTwentyOne; 

    if(this.numberDays > 21) this.negotiable=true;  

    this.priceAllDays = this.priceDay*this.numberDays; 
    this.updateTotal();
  }  

  updateTotal():void{
    this.totalPrice = this.priceAllDays;
    if (this.assurance)    
      this.totalPrice = this.priceAllDays + this.currentCar.assurance
  }
  
  public sendEmail(e: Event) {
    emailjs
      .sendForm('service_skr3des', 'template_ee1egdb', e.target as HTMLFormElement, {
        publicKey: '03NYWpwwA_dm4-h_-',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          this.router.navigateByUrl('/succes')
        },
        (error) => {
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
          alert("Eroare! Va rugam sa reincercati!")
        },
      );
  }
  
  ngOnDestroy(): void {
    this.currentCarSub.unsubscribe();
  }
}



