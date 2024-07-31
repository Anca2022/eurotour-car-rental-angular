import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CarAllInfo } from '../../types';
import { CommonModule } from '@angular/common';
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
    private contentful:ContentfulService
    ){}
  ngOnInit(): void {
    this.route.params.subscribe((param)=> this.id = param['id']);
    this.car$ = this.contentful.getCarById(this.id);
  }
}
