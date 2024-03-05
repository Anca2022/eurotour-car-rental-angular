import { Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FAQ } from '../../types';
import { fakeQuestions } from '../../fake-data';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss', '../conditions/conditions.component.scss']
})
export class FaqComponent implements OnInit{
  questions:FAQ[]=[];
  constructor(private titleService:Title){}
  ngOnInit(): void {
    this.questions = fakeQuestions; 
    this.titleService.setTitle('Intrebari Frecvente | Eurotour - Inchirieri masini Cluj-Napoca')
  }
  
  toggleAnswer(t:any){
    t.classList.toggle('active');
  }

}
