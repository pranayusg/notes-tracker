import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareNoteComponent } from './share-note.component';

describe('ShareNoteComponent', () => {
  let component: ShareNoteComponent;
  let fixture: ComponentFixture<ShareNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShareNoteComponent]
    });
    fixture = TestBed.createComponent(ShareNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
