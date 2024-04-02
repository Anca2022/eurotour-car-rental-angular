import { Injectable } from '@angular/core';
import { createClient } from 'contentful';
import { Car, CarAllInfo, CarTypes, CarsInCategory, FAQ } from '../types';
import { Observable, combineLatest, defer, map } from 'rxjs';

@Injectable({
  providedIn: 'root', 
})
export class ContentfulService {
  constructor() { }

  private client = createClient({
    space: 'u6ixfmcgy98k', 
    accessToken: 'XrwuMZKyYT8o_-sd-3aQGa7d0Cypa6oNrckFLXUBgmY'
  })

  private questions:Promise<any> = this.client.getEntries({content_type:'faq'});
  private cars:Promise<any> = this.client.getEntries({content_type:'car'});
  private carTypes:Promise<any> = this.client.getEntries({content_type:'carType'});

  questions$:Observable<FAQ[]>=defer(()=>this.questions).pipe(
    map( data => {
      let array : FAQ[] = []; 
      for(let i=0; i<data.items.length; i++)
        array.push(data.items[i].fields);
      return array;
    }) 
  )

  cars$:Observable<Car[]>=defer(()=>this.cars).pipe(
    map(data => {
      let array : Car[] = []; 
      for(let i=0; i<data.items.length; i++){
        let image:any= data.items[i].fields['img'];
        let car:Car={
          id : data.items[i].fields['id'], 
          name: data.items[i].fields['name'], 
          img: image.fields.file.url, 
          specs: [{fuel: data.items[i].fields['fuel']}, {gear: data.items[i].fields['gear']}, {trunk : data.items[i].fields['trunk']} ],
          equipment: data.items[i].fields['equipment'],
          carType: data.items[i].fields['carType']
        }
        array.push(car);
      }
      return array;
    }), 
  )

  private carTypes$:Observable<CarTypes[]>=defer(()=>this.carTypes).pipe(
    map(data => {
      let array : CarTypes[] = []; 
      for(let i=0; i<data.items.length; i++){
        let carType:CarTypes={
          carType : data.items[i].fields['carType'],
          price: [{dayOneThree:data.items[i].fields['dayOneThree']}, {dayFourSeven: data.items[i].fields['dayFourSeven']}, {dayEightTwentyOne: data.items[i].fields['dayEightTwentyOne']}], 
          warranty: data.items[i].fields['warranty'], 
          assurance: data.items[i].fields['assurance'], 
          promo:data.items[i].fields['promo']
        }
        array.push(carType);
      }
      return array;
    })
  )

  carsAllInfo$:Observable<CarAllInfo[]>=combineLatest([this.cars$, this.carTypes$]).pipe( 
    map(([cars, cartypes])=> {  
      let carsAllInfo:CarAllInfo[]=[]; 
      for(let i=0; i<cars.length; i++){
        let prices:any; 
        let promos:any; 
        let warranties:any;
        let assurances:any;  
        for(let j=0; j<cartypes.length; j++){
          if(cartypes[j].carType.toLowerCase() === cars[i].carType.toLowerCase()){
            prices = cartypes[j].price;
            promos = cartypes[j].promo;
            warranties = cartypes[j].warranty; 
            assurances = cartypes[j].assurance; 
          }
        } 
        let carAllInfo:CarAllInfo = {
          ...cars[i],
          price: prices,
          promo: promos,
          warranty: warranties, 
          assurance: assurances
        }
        carsAllInfo.push(carAllInfo); 
      }
      return carsAllInfo;
    })
  )

  carCategoryExtra$:Observable<CarsInCategory[]> = combineLatest([this.cars$, this.carTypes$]).pipe(
    map(([cars, cartype])=>{
      let categoriesExtra:CarsInCategory[]=[];
      cartype.forEach(type=>{
        let carsInCat:Car[] = cars.filter(car => car.carType.toLowerCase() === type.carType.toLowerCase() )
        let categoryExtra:CarsInCategory={
          ...type, 
          carsInCategory: carsInCat
        }
        categoriesExtra.push(categoryExtra);
      })
      return categoriesExtra;   
    })
  )

  getCarById(id:string):Observable<CarAllInfo>{
    return this.carsAllInfo$.pipe(
      map(cars => {
        return cars.find(car => car.id === id)!
      })
    )
  }
}