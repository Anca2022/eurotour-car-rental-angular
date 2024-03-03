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
  
  constructor(private route:ActivatedRoute, private router:Router){
  }
  ngOnInit(): void {
    this.route.params.subscribe(param => this.id = param['id']); 
    this.allCars = carsAllInfo; 
    this.currentCar = getCarById(this.id);
  }

  carSelect(id:string){
    this.currentCar = getCarById(id);
  }
}
