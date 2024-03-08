import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ArrowUpComponent } from './components/arrow-up/arrow-up.component';
import { ContentfulService } from './services/contentful.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, NavbarComponent, ArrowUpComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Eurotour-website-angular';
  constructor(private contentful:ContentfulService){
    
  }
  ngOnInit(): void {
    this.contentful.allData(); 
  }
}
