import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebboardListComponent } from './webboard-list.component';

describe('WebboardListComponent', () => {
  let component: WebboardListComponent;
  let fixture: ComponentFixture<WebboardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebboardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebboardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
