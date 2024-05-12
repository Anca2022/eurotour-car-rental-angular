import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarAllInfo} from '../../types';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ContentfulService } from '../../services/contentful.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{  
 cars$!:Observable<CarAllInfo[]>; 

 constructor(private titleService:Title, private contentful:ContentfulService){}
 ngOnInit(): void {
    this.titleService.setTitle('Euro Tour - Inchirieri masini Cluj-Napoca');
    this.cars$ = this.contentful.carsAllInfo$;
 }
}
