import { Component, OnDestroy, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollDirective } from '../../directives/scroll.directive';
import { ContentfulService } from '../../services/contentful.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, ScrollDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy{
  carId!:string;  
  sub!: Subscription; 
  constructor(private contentful:ContentfulService){}

  ngOnInit(): void{
    this.sub = this.contentful.cars$.subscribe(cars => this.carId = cars[0].id)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  //mobile menu

  openMenu(t1:any, t2:any){
          t1.classList.add('display-menu');
          t2.classList.add('display-exit-btn');
      }
  closeMenu(t1:any, t2:any){
      t1.classList.remove('display-menu');
      t2.classList.remove('display-exit-btn');
    }

}
