import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRecipeComponent } from './search-recipe.component';

describe('SearchRecipeComponent', () => {
  let component: SearchRecipeComponent;
  let fixture: ComponentFixture<SearchRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchRecipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
