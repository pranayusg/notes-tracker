import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NotesService } from '../notes.service';
import { alertHelpers } from 'src/app/helpers/alertsHelper';

@Component({
  selector: 'app-notes-item',
  templateUrl: './notes-item.component.html',
  styleUrls: ['./notes-item.component.css'],
})
export class NotesItemComponent {
  @Input() noteItem: any = {};
  @Input() noteType: string = 'my';
  @Input() otherUsers = [];
  @Output() reloadNotesAfterEdit: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() reloadNotesAfterDelete: EventEmitter<string> =
    new EventEmitter<string>();
  errorMessage!: string;

  private notifier = new Subject<void>();

  constructor(private notesService: NotesService) {}

  onDeleteClick = async (noteId: string) => {
    const result = await alertHelpers.getConfirmAlert({
      title: 'Are you sure you want to delete this note?',
      icon: 'info',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      this.notesService
        .deleteNote(noteId)
        .pipe(takeUntil(this.notifier))
        .subscribe({
          next: (response) => {
            this.reloadNotesAfterDelete.emit(`Reload notes`);
          },
          error: (err) => (this.errorMessage = err),
        });
    }
  };

  onReloadNotes(message: string): void {
    this.reloadNotesAfterEdit.emit(`Reload notes`);
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
