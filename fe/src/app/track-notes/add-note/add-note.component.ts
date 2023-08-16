import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotesService } from '../notes.service';
import { NewNote, Note } from './newNote';
import { NgForm } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
})
export class AddNoteComponent {
  @Input() type = 'add';
  @Input() noteId = '';
  newNote = new NewNote();
  errorMessage!: string;
  @Output() reloadNotes: EventEmitter<string> = new EventEmitter<string>();

  private notifier = new Subject<void>();

  constructor(
    private modalService: NgbModal,
    private notesService: NotesService
  ) {}

  ngOnChanges(): void {
    if (this.noteId) this.fetchNoteById();
  }

  fetchNoteById() {
    this.notesService
      .getNoteById(this.noteId)
      .pipe(takeUntil(this.notifier))
      .subscribe({
        next: (response) => {
          this.newNote.title = response.title;
          this.newNote.text = response.text;
          this.newNote.color = response.color;
        },
        error: (err) => (this.errorMessage = err),
      });
  }

  closeResult = '';

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  save(newQuoteForm: NgForm): void {
    let payload: Note = {
      title: newQuoteForm.value.title,
      text: newQuoteForm.value.text,
      color: newQuoteForm.value.color,
    };

    if (this.type === 'add')
      this.notesService.createNote(payload).subscribe({
        next: (response: any) => this.onSuccess(response, newQuoteForm),
        error: (err) => (this.errorMessage = err),
      });
    else
      this.notesService.editNote(this.noteId, payload).subscribe({
        next: (response: any) => this.onSuccess(response, newQuoteForm),
        error: (err) => (this.errorMessage = err),
      });
  }

  onSuccess(response: any, newQuoteForm: NgForm): void {
    this.modalService.dismissAll();
    newQuoteForm.reset();
    this.reloadNotes.emit(`Reload notes`);
  }

  resetForm(userSignInForm: NgForm): void {
    userSignInForm.reset();
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
