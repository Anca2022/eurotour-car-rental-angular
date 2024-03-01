import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Car, CarTypes } from '../../types';
import { carTypes, cars, hasPromo, getPrices } from '../../fake-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  cars:Car[]=[]; 
  carTypes:CarTypes[]=[];  
  constructor(){}
  ngOnInit(): void {
    this.cars=cars; 
    this.carTypes = carTypes;
    
  }
  promo(car:any){
    return hasPromo(car); 
  } 
  promoPrice(carType:string):number{
    return getPrices(carType)[2].dayEightTwentyOne;
    }

}
