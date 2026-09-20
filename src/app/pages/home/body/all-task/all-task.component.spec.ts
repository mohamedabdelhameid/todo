import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTaskComponent } from './all-task.component';

describe('AllTaskComponent', () => {
  let component: AllTaskComponent;
  let fixture: ComponentFixture<AllTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTaskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AllTaskComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
