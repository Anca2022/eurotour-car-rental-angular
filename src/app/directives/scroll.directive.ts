import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appScroll]',
  standalone: true
})
export class ScrollDirective {

  constructor() { }

  @HostBinding('class.new-header') newHeader!:boolean;
  @HostListener('window:scroll') onScroll(){
    if(window.scrollY >= 32){
      this.newHeader = true;
    }else{
      this.newHeader = false;
    }
  }
}
