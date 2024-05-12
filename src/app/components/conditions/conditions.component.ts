import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-conditions',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './conditions.component.html',
  styleUrl: './conditions.component.scss'
})
export class ConditionsComponent implements OnInit{
  constructor( private titleService: Title){}
  ngOnInit(): void {
    this.titleService.setTitle('Termeni si Conditii | Euro Tour - Inchirieri masini Cluj-Napoca')
  }

}
