import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramRecipeComponent } from './program-recipe.component';

describe('ProgramRecipeComponent', () => {
  let component: ProgramRecipeComponent;
  let fixture: ComponentFixture<ProgramRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramRecipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
