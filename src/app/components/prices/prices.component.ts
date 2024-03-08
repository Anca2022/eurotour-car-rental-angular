import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarTypes, CarsByCategory } from '../../types';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ContentfulService } from '../../services/contentful.service';


@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.scss'
})
export class PricesComponent implements OnInit{
  carTypes:CarTypes[]=[]; 
  ids:string[]=[];
  cars:string[][]=[]; 
  display:boolean[]=[]; 
  
  constructor(private titleService: Title, 
    private contentful:ContentfulService){}
  ngOnInit(): void {
    this.titleService.setTitle('Tarife | Eurotour - Inchirieri masini Cluj-Napoca')

    this.carTypes = this.contentful.getCarCategories();

    this.carTypes.forEach(type=> {
      let carsByCat:CarsByCategory = this.contentful.getCarsByCategory(type.carType); 
      this.ids.push(carsByCat.id); 
      this.cars.push(carsByCat.carNames);
      this.display.push(false); 
    })
  }
  toggle(index:number):void{
    if (this.display[index] === true) this.display[index]=false
    else this.display[index]=true;
  }

}
