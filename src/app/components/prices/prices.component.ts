import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarTypes } from '../../types';
import { carTypes } from '../../fake-data';
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
  
  constructor(){}
  ngOnInit(): void {
    this.carTypes = carTypes; 
  }

}
