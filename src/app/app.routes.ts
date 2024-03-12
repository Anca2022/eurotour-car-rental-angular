import { ExtraOptions, Routes } from '@angular/router';
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
    {path:'', pathMatch:'full', redirectTo:'home'},
    {path:'home', component:HomeComponent},
    {path:'masina/:id', component:SingleCarPageComponent}, 
    {path:'rezervari/:id', component:ReservationComponent}, 
    {path:'intrebari-frecvente', component:FaqComponent}, 
    {path:'termeni-si-conditii', component:ConditionsComponent}, 
    {path:'politica-confidentialitate', component:GdprComponent}, 
    {path:'tarife', component:PricesComponent},
    {path:'succes', component:SuccesComponent},
    {path:'**', component:NotFoundComponent}
];