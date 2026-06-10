import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsMy } from './trips-my';

describe('TripsMy', () => {
  let component: TripsMy;
  let fixture: ComponentFixture<TripsMy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripsMy],
    }).compileComponents();

    fixture = TestBed.createComponent(TripsMy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
