export interface FAQ{
    question:string,
    answer:string,
}

export interface Car{
    id:string, 
    name:string, 
    img: string, 
    specs:[{fuel:string}, {gear:'automata' | 'manuala'}, {trunk:number}, {carType: string} ],
    equipment: string[],
}

export interface CarTypes{
    type:string,
    price: [
        {dayOneThree: number}, 
        {dayFourSeven: number}, 
        {dayEightTwentyOne: number},    
    ], 
    warranty: number,
    assurance: number, 
    promo:boolean;
}