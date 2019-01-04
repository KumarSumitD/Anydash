import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjselectorComponent } from './objselector.component';

describe('ObjselectorComponent', () => {
  let component: ObjselectorComponent;
  let fixture: ComponentFixture<ObjselectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjselectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
