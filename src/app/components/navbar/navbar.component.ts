import { Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollDirective } from '../../directives/scroll.directive';
import { ContentfulService } from '../../services/contentful.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, ScrollDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  carId!:string; 

  constructor(private contentful:ContentfulService){}
  ngOnInit(): void {
    this.carId= this.contentful.getId(); 
   // console.log(this.carId)
  }
  //mobile menu

  openMenu(t1:any, t2:any){
          t1.classList.add('display-menu');
          t2.classList.add('display-exit-btn');
      };
  closeMenu(t1:any, t2:any){
      t1.classList.remove('display-menu');
      t2.classList.remove('display-exit-btn');
    }

  //language menu
  addLang(t:any){
    t.classList.add('display-languages');
  }
  removeLang(t:any) {
    t.classList.remove('display-languages');
    }

}
