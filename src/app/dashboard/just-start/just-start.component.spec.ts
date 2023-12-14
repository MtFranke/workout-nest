import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustStartComponent } from './just-start.component';

describe('JustStartComponent', () => {
  let component: JustStartComponent;
  let fixture: ComponentFixture<JustStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JustStartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JustStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
