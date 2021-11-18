import { ComponentFixture, TestBed } from '@angular/core/testing';

import { registerChampionComponent } from './registerChampion.component';

describe('registerChampionComponent', () => {
  let component: registerChampionComponent;
  let fixture: ComponentFixture<registerChampionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ registerChampionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(registerChampionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
