export interface FAQ{
    question:string,
    answer:string,
}

export interface Car{
    id:string, 
    name:string, 
    img: string, 
    specs:[{fuel:string}, {gear:string}, {trunk:number} ],
    equipment: string[],
    carType: string
}

export interface CarTypes{
    carType:string,
    price: [
        {dayOneThree: number}, 
        {dayFourSeven: number}, 
        {dayEightTwentyOne: number}    
    ], 
    warranty: number,
    assurance: number, 
    promo:boolean;
}

export interface CarAllInfo{
    id:string, 
    name:string, 
    img: string, 
    specs:[{fuel:string}, {gear:string}, {trunk:number}],
    equipment: string[],
    carType:string,
    price: [
        {dayOneThree: number}, 
        {dayFourSeven: number}, 
        {dayEightTwentyOne: number}   
    ], 
    warranty: number,
    assurance: number, 
    promo:boolean
}

export interface CarsInCategory extends CarTypes{
    carsInCategory: Car[]
} 