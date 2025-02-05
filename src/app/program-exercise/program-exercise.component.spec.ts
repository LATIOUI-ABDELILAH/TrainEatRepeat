import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramExerciseComponent } from './program-exercise.component';

describe('ProgramExerciseComponent', () => {
  let component: ProgramExerciseComponent;
  let fixture: ComponentFixture<ProgramExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramExerciseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
