import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesComponent } from './succes.component';

describe('SuccesComponent', () => {
  let component: SuccesComponent;
  let fixture: ComponentFixture<SuccesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
