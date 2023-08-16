import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesItemComponent } from './notes-item.component';

describe('NotesItemComponent', () => {
  let component: NotesItemComponent;
  let fixture: ComponentFixture<NotesItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotesItemComponent]
    });
    fixture = TestBed.createComponent(NotesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
