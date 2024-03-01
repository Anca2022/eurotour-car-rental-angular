import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Car } from '../../types';
import { getCarById, getPrices, hasPromo } from '../../fake-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-car-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './single-car-page.component.html',
  styleUrl: './single-car-page.component.scss'
})
export class SingleCarPageComponent implements OnInit {
id!:string; 
car!:Car;  
prices!:any; 
promo:boolean = false; 
constructor(private route:ActivatedRoute){}
ngOnInit(): void {
  this.route.params.subscribe((param)=> this.id = param['id']);
  this.car = getCarById(this.id); 
  this.prices = getPrices(this.car.specs[3].carType);
  this.promo = hasPromo(this.car.specs[3].carType); 
}
}
