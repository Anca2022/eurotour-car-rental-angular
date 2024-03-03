import { Component, HostListener, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { carsAllInfo } from '../../fake-data';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  carId!:string; 

  constructor(){}
  ngOnInit(): void {
    this.carId = carsAllInfo[0].id; 
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
