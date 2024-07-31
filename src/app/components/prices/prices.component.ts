import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContentfulService } from '../../services/contentful.service';
import { Observable } from 'rxjs';
import { CarsInCategory } from '../../types';

@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.scss'
})
export class PricesComponent implements OnInit{

  display:boolean[]=[]; 
  carCategories$!:Observable<CarsInCategory[]>; 
  
  constructor(private contentful:ContentfulService){}
  ngOnInit(): void {
    this.carCategories$ = this.contentful.carCategoryExtra$;
  }

  toggle(index:number):void{
    if (this.display[index] === true) this.display[index]=false
    else this.display[index] = true;
  }
  toggleBonus(bonus:Element){
    bonus.classList.toggle('display-bonus');
  }
}
