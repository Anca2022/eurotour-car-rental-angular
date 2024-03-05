import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CarAllInfo } from '../../types';
import { carsAllInfo, getCarById } from '../../fake-data';
import { CommonModule } from '@angular/common';

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

  constructor(private route:ActivatedRoute, private router:Router){
  }
  ngOnInit(): void {
    this.route.params.subscribe(param => this.id = param['id']); 
    this.currentCar = getCarById(this.id);
    this.allCars = carsAllInfo; 
    this.priceDay=this.currentCar.price[0].dayOneThree;
    this.priceAllDays = this.numberDays * this.priceDay;
    this.totalPrice = this.priceAllDays;  
  }

  carSelect(id:string){
    this.currentCar = getCarById(id);
    this.updatePrices(); 
  }

  updatePrices(){
    if(this.numberDays < 4) this.priceDay = this.currentCar.price[0].dayOneThree
    else if (this.numberDays < 8) this.priceDay = this.currentCar.price[1].dayFourSeven
    else if (this.numberDays > 8) this.priceDay = this.currentCar.price[2].dayEightTwentyOne; 

    if(this.numberDays > 21) this.negotiable=true;  

    this.priceAllDays = this.priceDay*this.numberDays; 
  }
  
  updateTotal(assuranceBox:any){
    if(assuranceBox.checked) this.totalPrice = this.priceAllDays + this.currentCar.assurance;
    else this.totalPrice = this.priceAllDays;
  }
}



