import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarAllInfo} from '../../types';
import { CommonModule } from '@angular/common';
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

 constructor(private contentful:ContentfulService){}
 ngOnInit(): void {
    this.cars$ = this.contentful.carsAllInfo$;
 }
}
