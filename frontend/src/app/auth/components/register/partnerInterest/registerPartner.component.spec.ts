import { ComponentFixture, TestBed } from '@angular/core/testing';

import { registerPartnerComponent } from './registerPartner.component';

describe('registerPartnerComponent', () => {
  let component: registerPartnerComponent;
  let fixture: ComponentFixture<registerPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ registerPartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(registerPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
