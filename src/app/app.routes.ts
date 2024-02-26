import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FaqComponent } from './components/faq/faq.component';
import { GdprComponent } from './components/gdpr/gdpr.component';
import { PricesComponent } from './components/prices/prices.component';
import { ConditionsComponent } from './components/conditions/conditions.component';

export const routes: Routes = [
    {path:'', component:HomeComponent}, 
    {path:'intrebari-frecvente', component:FaqComponent}, 
    {path:'termeni-si-conditii', component:ConditionsComponent}, 
    {path:'politica-confidentialitate', component:GdprComponent}, 
    {path:'tarife', component:PricesComponent}
];
