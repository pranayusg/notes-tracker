import { Component, Input } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent {
  @Input() type = 'my';
  @Input() reloadNotes = false;
  notesData: any = [];
  errorMessage = '';
  searchText: string = '';

  private notifier = new Subject<void>();

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    if (this.type === 'my') this.fetchMyNotes();
    else this.fetchNotesSharedWithMe();
  }

  ngOnChanges(): void {
    if (this.reloadNotes) this.fetchMyNotes();
  }

  reFetchNotes(event: any) {
    this.fetchMyNotes();
  }

  fetchNotesBySearchText() {
    this.notesService
      .searchNotes(this.searchText)
      .pipe(takeUntil(this.notifier))
      .subscribe({
        next: (response) => {
          this.notesData = response;
        },
        error: (err) => (this.errorMessage = err),
      });
  }

  fetchMyNotes() {
    this.notesService
      .getMyNotes()
      .pipe(takeUntil(this.notifier))
      .subscribe({
        next: (response) => {
          this.notesData = response;
        },
        error: (err) => (this.errorMessage = err),
      });
  }

  fetchNotesSharedWithMe() {
    this.notesService
      .getSharedNotes()
      .pipe(takeUntil(this.notifier))
      .subscribe({
        next: (response) => {
          const notes: any = [];
          response.forEach((element: any) => {
            notes.push(element.note);
          });

          this.notesData = notes;
        },
        error: (err) => (this.errorMessage = err),
      });
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
