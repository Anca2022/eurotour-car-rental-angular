import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-succes',
  standalone: true,
  imports: [],
  templateUrl: './succes.component.html',
  styleUrl: './succes.component.scss'
})
export class SuccesComponent implements OnInit{
  constructor(private titleService:Title){}
  ngOnInit(): void {
    this.titleService.setTitle('Eurotour - Inchirieri masini Cluj-Napoca')
  }

}
