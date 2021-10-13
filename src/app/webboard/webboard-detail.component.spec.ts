import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebboardDetailComponent } from './webboard-detail.component';

describe('WebboardDetailComponent', () => {
  let component: WebboardDetailComponent;
  let fixture: ComponentFixture<WebboardDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebboardDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebboardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
