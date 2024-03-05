import { Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './not-found.component.html',
  styleUrl: '../succes/succes.component.scss'
})
export class NotFoundComponent implements OnInit{
  constructor(private titleService:Title){}
  ngOnInit(): void {
    this.titleService.setTitle('Eroare| Eurotour - Inchirieri masini Cluj-Napoca')
  }

}

