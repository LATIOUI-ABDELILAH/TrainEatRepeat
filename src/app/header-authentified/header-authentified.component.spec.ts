import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAuthentifiedComponent } from './header-authentified.component';

describe('HeaderAuthentifiedComponent', () => {
  let component: HeaderAuthentifiedComponent;
  let fixture: ComponentFixture<HeaderAuthentifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderAuthentifiedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderAuthentifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
