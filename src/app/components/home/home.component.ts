import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarAllInfo } from '../../types';
import { carsAllInfo } from '../../fake-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  cars:CarAllInfo[]=[]; 
  
  constructor(){}
  ngOnInit(): void {
    this.cars=carsAllInfo; 
  }

}
