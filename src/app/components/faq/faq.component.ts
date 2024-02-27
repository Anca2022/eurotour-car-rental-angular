import { Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FAQ } from '../../types';
import { fakeQuestions } from '../../fake-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss', '../conditions/conditions.component.scss']
})
export class FaqComponent implements OnInit{
  questions:FAQ[]=[];
  constructor(){}
  ngOnInit(): void {
    this.questions = fakeQuestions; 
  }
  
  toggleAnswer(t:any){
    t.classList.toggle('active');
  }

}
