import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarAllInfo } from '../../types';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { carsAllInfo } from '../../fake-data';
//import { ContentfulService } from '../../services/contentful.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
 carsAllInfo:CarAllInfo[]=[];   

 constructor(private titleService:Title){}
 ngOnInit(): void {
    this.titleService.setTitle('Eurotour - Inchirieri masini Cluj-Napoca');
    this.carsAllInfo = carsAllInfo; 
 }

  // constructor(private titleService:Title,
  //     private contentful:ContentfulService){    }
  // ngOnInit(): void {
  //   this.titleService.setTitle('Eurotour - Inchirieri masini Cluj-Napoca');
  //   this.carsAllInfo = this.contentful.getAllInfo(); 
  // }
}
