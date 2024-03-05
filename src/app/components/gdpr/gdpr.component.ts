import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gdpr',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './gdpr.component.html',
  styleUrl: '../conditions/conditions.component.scss'
})
export class GdprComponent implements OnInit {
  constructor(private titleService:Title){}  
  ngOnInit(): void {
    this.titleService.setTitle('Politica de confidentialitate| Eurotour - Inchirieri masini Cluj-Napoca')
  }

}
