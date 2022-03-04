import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Member1ListComponent } from './member1-list.component';

describe('Member1ListComponent', () => {
  let component: Member1ListComponent;
  let fixture: ComponentFixture<Member1ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Member1ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Member1ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
