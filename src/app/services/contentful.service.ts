import { Injectable } from '@angular/core';
import { createClient } from 'contentful';
import { Car, CarAllInfo, CarTypes, CarsInCategory, FAQ } from '../types';
import { Observable, combineLatest, concatAll, defer, filter, map, tap, toArray } from 'rxjs';

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
    }), 
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

  carTypes$:Observable<CarTypes[]>=defer(()=>this.carTypes).pipe(
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
          if(cartypes[j].carType === cars[i].carType){
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
        let carsInCat = cars.filter(car => car.carType === type.carType )
        let categoryExtra:CarsInCategory={
          ...type, 
          carsInCategory: carsInCat
        }
        categoriesExtra.push(categoryExtra);
      })
      return categoriesExtra;   
    }),
    tap(console.log)
  )


//!!! aici merge find!!! 
  getCarById(id:string):Observable<CarAllInfo>{
    return this.carsAllInfo$.pipe(
      map(cars => {
        return cars.find(car => car.id === id)!
      })
    )
  }
}
  








//   questions:any[]=[]; 
//   cars:any[]=[]; 
//   carTypes:any[]=[]; 
//   carsAllInfo:any[]=[];
//   id:any[]=[]; 

//   constructor() { }

//   private client = createClient({
//     space: 'u6ixfmcgy98k', 
//     accessToken: 'XrwuMZKyYT8o_-sd-3aQGa7d0Cypa6oNrckFLXUBgmY'
//   })
  
//   allData():void{
//     this.client.getEntries().then(data=>{
//       data.items.forEach(item=> {
//         if (item.sys.contentType.sys.id === 'car'){
//           let image:any= item.fields['img']; 
//           let singleCar:any = {
//             id : item.fields['id'], 
//             name: item.fields['name'], 
//             img: image.fields.file.url, 
//             specs: [{fuel: item.fields['fuel']}, {gear: item.fields['gear']}, {trunk : item.fields['trunk']} ],
//             equipment: item.fields['equipment'],
//             carType: item.fields['carType']
//           }
//           this.cars.push(singleCar); 
//         }
//         else if (item.sys.contentType.sys.id === 'carType'){
//           let carCat = {
//             carType : item.fields['carType'],
//             price: [{dayOneThree:item.fields['dayOneThree']}, {dayFourSeven: item.fields['dayFourSeven']}, {dayEightTwentyOne: item.fields['dayEightTwentyOne']}], 
//             warranty: item.fields['warranty'], 
//             assurance: item.fields['assurance'], 
//             promo:item.fields['promo']
//           }
//           this.carTypes.push(carCat);  
//         }
//         else if (item.sys.contentType.sys.id === 'faq'){
//           let quest = {
//             question: item.fields['question'], 
//             answer: item.fields['answer']
//           }
//           this.questions.push(quest);
//         }
//       }) 
//       this.id.push(this.cars[0].id); 
//       this.joinAllInfo();
//     })
//   }

//   joinAllInfo():void{
//      this.cars.forEach(eachCar => { 
//       let category = this.carTypes.find(cat => cat.carType === eachCar.carType);
//       if(category!==undefined){
//         let carInfo : any = {
//           id : eachCar.id, 
//           name : eachCar.name, 
//           img : eachCar.img, 
//           specs:[{fuel : eachCar.specs[0].fuel}, {gear : eachCar.specs[1].gear}, {trunk:eachCar.specs[2].trunk}], 
//           equipment: eachCar.equipment,
//           carType: eachCar.carType, 
//           price: [{dayOneThree : category.price[0].dayOneThree}, {dayFourSeven : category.price[1].dayFourSeven}, {dayEightTwentyOne : category.price[2].dayEightTwentyOne}],
//           warranty: category.warranty, 
//           assurance: category.assurance, 
//           promo:category.promo
//         } 
//         this.carsAllInfo.push(carInfo); 
//       }
//     })
//   }

//   getAllInfo():CarAllInfo[]{
//     return this.carsAllInfo; 
//   }

//   getCars():Car[]{
//     return this.cars;
//   }

//   getCarsByCategory(cat:string):CarsByCategory{
//     let carCat:CarAllInfo[] = this.carsAllInfo.filter(car => car.carType === cat); 
//     let id:string = carCat[0].id; 
//     let cars:string[] = carCat.map(car => car.name); 
//     let carsByCategory: CarsByCategory = {
//         id: id,
//         carNames: cars
//     }
//     return carsByCategory;
//   }

//   getCarById(id:string):CarAllInfo{
//     return this.carsAllInfo.find(car=> car.id === id)!; 
//     }

//   getCarCategories():CarTypes[] {
//     return this.carTypes; 
//   }

//   getQuestions():FAQ[]{    
//     return this.questions; 
//   }

//   getId():string[]{
//     return this.id; 
//   }
// }