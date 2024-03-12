import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CarAllInfo } from '../../types';
import { CommonModule} from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ContentfulService } from '../../services/contentful.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent implements OnInit{
  id!:string;
  allCars:CarAllInfo[]=[]; 
  currentCar!:CarAllInfo;  
  numberDays:number=1; 
  priceDay!:number; 
  priceAllDays!:number;  
  negotiable:boolean=false; 
  totalPrice!:number; 
  startDate!:any;  
  endDate!:any; 
  today = new Date();
  initial:any; 
  startTime!:string;
  endTime!:string;  
  assurance: boolean = false;
  
  constructor(private route:ActivatedRoute, 
    private titleService:Title,
    private contentful:ContentfulService){
  }
  ngOnInit(): void {
    this.titleService.setTitle('Rezervari | Eurotour - Inchirieri masini Cluj-Napoca')
    this.route.params.subscribe(param => this.id = param['id']); 

    this.setTheCar();
    this.setTheDate();
  }

  setTheCar():void{
    this.currentCar = this.contentful.getCarById(this.id);
    this.allCars = this.contentful.getAllInfo();
    this.priceDay=this.currentCar.price[0].dayOneThree;
    this.priceAllDays = this.numberDays * this.priceDay;
    this.totalPrice = this.priceAllDays;
  }

  setTheDate(){
    this.startDate = new Date (this.today); 
    this.endDate = new Date(this.today); 
    this.endDate.setDate(this.today.getDate() + 1);
  }
  carSelect(id:string){
    this.currentCar = this.contentful.getCarById(id);
    this.updatePrices(); 
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
    let time = Math.abs(this.endDate - this.startDate); 
    this.numberDays = Math.ceil(time / (1000 * 60 * 60 * 24)); 
    if (this.startTime < this.endTime) 
      this.numberDays++;
    this.updatePrices();
  }

  setAssurance(assuranceBox:any):void{
    if(assuranceBox.checked) this.assurance = true
    else this.assurance = false; 
    this.updateTotal(); 
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
  
}



