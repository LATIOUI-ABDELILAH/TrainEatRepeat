import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexAuthentifiedComponent } from './index-authentified.component';

describe('IndexAuthentifiedComponent', () => {
  let component: IndexAuthentifiedComponent;
  let fixture: ComponentFixture<IndexAuthentifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexAuthentifiedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexAuthentifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
