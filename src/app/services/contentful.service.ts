import { Injectable } from '@angular/core';
import { createClient } from 'contentful';
import { Car, CarAllInfo, CarTypes, CarsByCategory, FAQ } from '../types';

@Injectable({
  providedIn: 'root', 
})
export class ContentfulService {
  questions:any[]=[]; 
  cars:any[]=[]; 
  carTypes:any[]=[]; 
  carsAllInfo:any[]=[];
  id!:any; 

  constructor() { }

  private client = createClient({
    space: 'u6ixfmcgy98k', 
    accessToken: 'XrwuMZKyYT8o_-sd-3aQGa7d0Cypa6oNrckFLXUBgmY'
  })
  
  allData():void{
    this.client.getEntries().then(data=>{
      data.items.forEach(item=> {
        if (item.sys.contentType.sys.id === 'car'){
          let image:any= item.fields['img']; 
          let singleCar:any = {
            id : item.fields['id'], 
            name: item.fields['name'], 
            img: image.fields.file.url, 
            specs: [{fuel: item.fields['fuel']}, {gear: item.fields['gear']}, {trunk : item.fields['trunk']} ],
            equipment: item.fields['equipment'],
            carType: item.fields['carType']
          }
          this.cars.push(singleCar); 
        }
        else if (item.sys.contentType.sys.id === 'carType'){
          let carCat = {
            carType : item.fields['carType'],
            price: [{dayOneThree:item.fields['dayOneThree']}, {dayFourSeven: item.fields['dayFourSeven']}, {dayEightTwentyOne: item.fields['dayEightTwentyOne']}], 
            warranty: item.fields['warranty'], 
            assurance: item.fields['assurance'], 
            promo:item.fields['promo']
          }
          this.carTypes.push(carCat);  
        }
        else if (item.sys.contentType.sys.id === 'faq'){
          let quest = {
            question: item.fields['question'], 
            answer: item.fields['answer']
          }
          this.questions.push(quest);
        }
      })
      this.joinAllInfo();
     this.id=this.cars[0].id; //aici merge si il atribuie, in getter nu il mai citeste
    })
  }

 joinAllInfo():void{
     this.cars.forEach(eachCar => { 
      let category = this.carTypes.find(cat => cat.carType === eachCar.carType);
      if(category!==undefined){
        let carInfo : any = {
          id : eachCar.id, 
          name : eachCar.name, 
          img : eachCar.img, 
          specs:[{fuel : eachCar.specs[0].fuel}, {gear : eachCar.specs[1].gear}, {trunk:eachCar.specs[2].trunk}], 
          equipment: eachCar.equipment,
          carType: eachCar.carType, 
          price: [{dayOneThree : category.price[0].dayOneThree}, {dayFourSeven : category.price[1].dayFourSeven}, {dayEightTwentyOne : category.price[2].dayEightTwentyOne}],
          warranty: category.warranty, 
          assurance: category.assurance, 
          promo:category.promo
        } 
        this.carsAllInfo.push(carInfo); 
      }
    })
  }


  getAllInfo():CarAllInfo[]{
    return this.carsAllInfo; 
  }

  getCars():Car[]{
    return this.cars;
  }

  getCarsByCategory(cat:string):CarsByCategory{
    let carCat:CarAllInfo[] = this.carsAllInfo.filter(car => car.carType === cat); 
    let id:string = carCat[0].id; 
    let cars:string[] = carCat.map(car => car.name); 
    let carsByCategory: CarsByCategory = {
        id: id,
        carNames: cars
    }
    return carsByCategory;
  }

  getCarById(id:string):CarAllInfo{
    return this.carsAllInfo.find(car=> car.id === id)!; 
    }

  getCarCategories():CarTypes[] {
    return this.carTypes; 
  }

  getQuestions():FAQ[]{
    return this.questions; 
  }

  getId():string{
    return this.id;
  }
}