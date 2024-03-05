import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarAllInfo } from '../../types';
import { carsAllInfo } from '../../fake-data';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  cars:CarAllInfo[]=[]; 
  
  constructor(private titleService:Title){}
  ngOnInit(): void {
    this.titleService.setTitle('Eurotour - Inchirieri masini Cluj-Napoca')
    this.cars=carsAllInfo; 
  }

}
