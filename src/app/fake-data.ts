import { Car, CarTypes, FAQ } from "./types";

export const fakeQuestions:FAQ[] =[
    {question:'De ce ploua noaptea?', answer:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus, nam.'},
    {question:'De unde vin visele cand nu dormim?', answer:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis quod praesentium optio aperiam totam ratione.'},
    {question:'Care e mai buna, ciocolata alba sau ciocolata neagra?', answer:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quae, numquam sequi quod obcaecati nihil itaque animi asperiores praesentium.'},
    {question:'Vrei o cafea?', answer:'Lorem ipsum dolor sit amet consectetur adipisicing.'}
];

export const cars:Car [] = [
    {id: 'opel-corsa-1-4-i', name: 'Opel Corsa 1.4i', img: 'img/opel-corsa-1-4-i-265.jpg',  specs:[{fuel:'benzina'}, {gear:'manuala'}, {trunk:1}, {carType: 'hatchback'}], equipment:['aer conditionat', 'bluetooth', 'scaune izofix'] },
    {id: 'chevrolet-spark-0-8-i' , name: 'Chevrolet Spark 0.8i', img: 'img/chevrolet-spark-0-8-i.jpg', specs:[{fuel:'benzina'}, {gear:'automata'}, {trunk:3}, {carType: 'SUV'}], equipment:['aer conditionat', 'bluetooth', 'touchscreen']  },
    {id: 'vw-passat-2-0-tdi' , name: 'VW Passat 2.0 TDI', img: 'img/vw-passat-2017-648.jpg', specs:[{fuel:'motorina'}, {gear:'manuala'}, {trunk:2}, {carType: 'sedan'}], equipment:['aer conditionat', 'bluetooth', 'volan piele', 'USB-C']  }
];

export const carTypes: CarTypes[] = [
    {type: 'hatchback', price: [{dayOneThree:28}, {dayFourSeven: 22}, {dayEightTwentyOne: 18}], warranty: 200, assurance: 40, promo:true},
    {type: 'SUV', price: [{dayOneThree: 55}, {dayFourSeven: 50}, {dayEightTwentyOne: 48}],  warranty: 300, assurance: 60, promo:false},
    {type: 'sedan', price: [{dayOneThree: 36}, {dayFourSeven: 32}, {dayEightTwentyOne: 28}], warranty: 250, assurance: 50, promo:false}
]
