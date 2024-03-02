import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Car, CarTypes } from '../../types';
import { carTypes, cars, getCarById } from '../../fake-data';
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
  allCars:Car[]=[]; 
  carCategories:CarTypes[]=[]
  car!:Car;  
  
  constructor(private route:ActivatedRoute, private router:Router){}
  ngOnInit(): void {
    this.route.params.subscribe(param => this.id = param['id']); 
    this.allCars = cars; 
    this.carCategories = carTypes; 
    this.car = getCarById(this.id); 
    
  }
}
