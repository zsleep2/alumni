import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAlbumDetailComponent } from './admin-album-detail.component';

describe('AdminAlbumDetailComponent', () => {
  let component: AdminAlbumDetailComponent;
  let fixture: ComponentFixture<AdminAlbumDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAlbumDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAlbumDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
