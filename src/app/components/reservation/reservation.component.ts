import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CarAllInfo } from '../../types';
import { carsAllInfo, getCarById } from '../../fake-data';
import { CommonModule} from '@angular/common';


@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [RouterModule, CommonModule],
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
  
  constructor(private route:ActivatedRoute, private router:Router){
  }
  ngOnInit(): void {
    this.route.params.subscribe(param => this.id = param['id']); 
    this.setTheCar();
    this.setTheDate();
  }

  carSelect(id:string){
    this.currentCar = getCarById(id);
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
  
  setTheCar():void{
    this.currentCar = getCarById(this.id);
    this.allCars = carsAllInfo; 
    this.priceDay=this.currentCar.price[0].dayOneThree;
    this.priceAllDays = this.numberDays * this.priceDay;
    this.totalPrice = this.priceAllDays;
  }

  setTheDate(){
    this.startDate = new Date (this.today); 
    this.endDate = new Date(this.today); 
    this.endDate.setDate(this.today.getDate() + 1);
  }
}



