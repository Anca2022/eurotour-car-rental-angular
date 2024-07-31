import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FaqComponent } from './components/faq/faq.component';
import { GdprComponent } from './components/gdpr/gdpr.component';
import { PricesComponent } from './components/prices/prices.component';
import { ConditionsComponent } from './components/conditions/conditions.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { SingleCarPageComponent } from './components/single-car-page/single-car-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SuccesComponent } from './components/succes/succes.component';

export const routes: Routes = [
    {path:'', pathMatch:'full', title: 'Euro Tour - Închirieri mașini Cluj-Napoca', redirectTo:'home'},
    {path:'home', title:'Euro Tour - Închirieri mașini Cluj-Napoca', component:HomeComponent},
    {path:'masina/:id', title:'Detalii Mașină | Euro Tour - Închirieri mașini Cluj-Napoca', component:SingleCarPageComponent}, 
    {path:'rezervari/:id', title:'Rezervări | Euro Tour - Închirieri mașini Cluj-Napoca', component:ReservationComponent}, 
    {path:'intrebari-frecvente', title:'Întrebări Frecvente | Euro Tour - Închirieri mașini Cluj-Napoca', component:FaqComponent}, 
    {path:'termeni-si-conditii', title:'Termeni și Condiții | Euro Tour - Închirieri mașini Cluj-Napoca', component:ConditionsComponent}, 
    {path:'politica-confidentialitate', title:'Politica de confidențialitate | Euro Tour - Închirieri mașini Cluj-Napoca', component:GdprComponent}, 
    {path:'tarife', title:'Tarife | Euro Tour - Închirieri mașini Cluj-Napoca', component:PricesComponent},
    {path:'succes', title:'Rezervare trimisă | Euro Tour - Închirieri mașini Cluj-Napoca', component:SuccesComponent},
    {path:'**', title:'Pagina nu a fost găsită | Euro Tour - Închirieri mașini Cluj-Napoca', component:NotFoundComponent}
];