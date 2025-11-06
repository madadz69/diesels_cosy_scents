import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoIsDieselComponent } from './who-is-diesel.component';

describe('WhoIsDieselComponent', () => {
  let component: WhoIsDieselComponent;
  let fixture: ComponentFixture<WhoIsDieselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhoIsDieselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhoIsDieselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
