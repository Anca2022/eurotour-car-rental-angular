import { Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContentfulService } from '../../services/contentful.service';
import { Observable } from 'rxjs';
import { FAQ } from '../../types';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss', '../conditions/conditions.component.scss']
})
export class FaqComponent implements OnInit{
  questions$!:Observable<FAQ[]>;

  constructor(private contentful: ContentfulService){}
  ngOnInit(): void {
    this.questions$ = this.contentful.questions$;  
  }
  
  toggleAnswer(t:any){
    t.classList.toggle('active');
  }

}
