import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarTypes, CarsByCategory } from '../../types';
import { carTypes, getCarsByCategory } from '../../fake-data';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.scss'
})
export class PricesComponent implements OnInit{
  carTypes:CarTypes[]=[]; 
  ids:string[]=[];
  cars:string[][]=[]; 
  display:boolean[]=[]; 
  
  constructor(){}
  ngOnInit(): void {
    this.carTypes = carTypes; 
    carTypes.forEach(type=> {
      this.ids.push(getCarsByCategory(type.carType).id); 
      this.cars.push(getCarsByCategory(type.carType).carNames);
      this.display.push(false); 
    })
  }
  toggle(index:number):void{
    if (this.display[index] === true) this.display[index]=false
    else this.display[index]=true;
  }

}
