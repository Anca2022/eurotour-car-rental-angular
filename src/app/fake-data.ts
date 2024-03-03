import { Car, CarTypes, CarAllInfo, FAQ } from "./types";

export const fakeQuestions:FAQ[] =[
    {question:'De ce ploua noaptea?', answer:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus, nam.'},
    {question:'De unde vin visele cand nu dormim?', answer:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis quod praesentium optio aperiam totam ratione.'},
    {question:'Care e mai buna, ciocolata alba sau ciocolata neagra?', answer:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quae, numquam sequi quod obcaecati nihil itaque animi asperiores praesentium.'},
    {question:'Vrei o cafea?', answer:'Lorem ipsum dolor sit amet consectetur adipisicing.'}
];

const cars:Car [] = [
    {id: 'opel-corsa-1-4-i', name: 'Opel Corsa 1.4i', img: '../../../assets/opel-corsa-1-4-i-265.jpg',  specs:[{fuel:'benzina'}, {gear:'manuala'}, {trunk:1}], equipment:['aer conditionat', 'bluetooth', 'scaune izofix'], carType: 'hatchback' },
    {id: 'chevrolet-spark-0-8-i' , name: 'Chevrolet Spark 0.8i', img: '../../../assets/chevrolet-spark-0-8-i.jpg', specs:[{fuel:'benzina'}, {gear:'automata'}, {trunk:3}], equipment:['aer conditionat', 'bluetooth', 'touchscreen'], carType: 'SUV'  },
    {id: 'vw-passat-2-0-tdi' , name: 'VW Passat 2.0 TDI', img: '../../../assets/vw-passat-2017-648.jpg', specs:[{fuel:'motorina'}, {gear:'manuala'}, {trunk:5}], equipment:['aer conditionat', 'bluetooth', 'volan piele', 'USB-C'], carType: 'sedan'  }    ];

export const carTypes: CarTypes[] = [
    {carType: 'hatchback', price: [{dayOneThree:28}, {dayFourSeven: 22}, {dayEightTwentyOne: 18}], warranty: 200, assurance: 40, promo:true},
    {carType: 'SUV', price: [{dayOneThree: 55}, {dayFourSeven: 50}, {dayEightTwentyOne: 48}],  warranty: 300, assurance: 60, promo:false},
    {carType: 'sedan', price: [{dayOneThree: 36}, {dayFourSeven: 32}, {dayEightTwentyOne: 28}], warranty: 250, assurance: 50, promo:true}
]

export const carsAllInfo:CarAllInfo[]=[];   
joinData(cars, carTypes);
 

// const promoCars:string[] = carTypes.filter((c)=>c.promo).map((p)=>p.carType); 

// export function hasPromo(carType:any):boolean{
//     for(let i=0; i<=promoCars.length; i++)
//     {if (carType === promoCars[i]) return true;}
//     return false; 
//   }

export function getCarById(id:string):CarAllInfo{
    return carsAllInfo.find(car=> car.id === id)!; 
}

// export function getPrices(type:string):any{
//     let category = carTypes.find(car => car.carType === type);
//     return category?.price; 
// }


function joinData(cars:Car[], carTypes:CarTypes[]):void {
    cars.forEach(eachCar=> {
        let category = carTypes.find(cat => cat.carType === eachCar.carType);
        if(category!==undefined){
            let carInfo : CarAllInfo = {
                id : eachCar.id, 
                name : eachCar.name, 
                img : eachCar.img, 
                specs:[{fuel : eachCar.specs[0].fuel}, {gear : eachCar.specs[1].gear}, {trunk:eachCar.specs[2].trunk}], 
                equipment: eachCar.equipment,
                carType: eachCar.carType, 
                price: [{dayOneThree : category.price[0].dayOneThree}, {dayFourSeven : category.price[1].dayFourSeven}, {dayEightTwentyOne : category.price[2].dayEightTwentyOne} ],
                warranty: category.warranty, 
                assurance: category.assurance, 
                promo:category.promo
            } 
            carsAllInfo.push(carInfo); 
        }
    })
}