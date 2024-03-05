import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CarAllInfo } from '../../types';
import { getCarById } from '../../fake-data';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-single-car-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './single-car-page.component.html',
  styleUrl: './single-car-page.component.scss'
})
export class SingleCarPageComponent implements OnInit {
  id!:string; 
  car!:CarAllInfo; 
  constructor(private route:ActivatedRoute, private titleService:Title){}
  ngOnInit(): void {
    this.titleService.setTitle('Detalii Masina | Eurotour - Inchirieri masini Cluj-Napoca')
    this.route.params.subscribe((param)=> this.id = param['id']);
    this.car = getCarById(this.id); 
  }
}
