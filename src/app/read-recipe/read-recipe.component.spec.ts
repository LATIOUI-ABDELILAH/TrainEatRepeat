import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadRecipeComponent } from './read-recipe.component';

describe('ReadRecipeComponent', () => {
  let component: ReadRecipeComponent;
  let fixture: ComponentFixture<ReadRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadRecipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
