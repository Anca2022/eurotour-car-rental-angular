import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CarAllInfo } from '../../types';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ContentfulService } from '../../services/contentful.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-car-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './single-car-page.component.html',
  styleUrl: './single-car-page.component.scss'
})
export class SingleCarPageComponent implements OnInit {
  id!:string; 
  car$!:Observable<CarAllInfo>;  
  constructor(private route:ActivatedRoute,
    private titleService:Title,
    private contentful:ContentfulService
    ){}
  ngOnInit(): void {
    this.titleService.setTitle('Detalii Masina | Euro Tour - Inchirieri masini Cluj-Napoca')
    this.route.params.subscribe((param)=> this.id = param['id']);
    this.car$ = this.contentful.getCarById(this.id);
  }
}
