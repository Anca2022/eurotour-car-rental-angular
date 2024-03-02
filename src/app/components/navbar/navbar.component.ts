import { Component, HostListener} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
 
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
