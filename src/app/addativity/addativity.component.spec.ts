import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddativityComponent } from './addativity.component';

describe('AddativityComponent', () => {
  let component: AddativityComponent;
  let fixture: ComponentFixture<AddativityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddativityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddativityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
