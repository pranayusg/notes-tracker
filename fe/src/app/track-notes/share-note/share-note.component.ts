import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotesService } from '../notes.service';
import { NgForm } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-share-note',
  templateUrl: './share-note.component.html',
  styleUrls: ['./share-note.component.css'],
})
export class ShareNoteComponent {
  @Input() noteId = '';
  private notifier = new Subject<void>();
  errorMessage!: string;

  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings = {};

  constructor(
    private modalService: NgbModal,
    private notesService: NotesService
  ) {}

  ngOnInit() {
    console.log(this.noteId);
    if (this.noteId) {
      this.notesService.getOtherUsers().subscribe({
        next: (response: any) => {
          this.dropdownList = response;
        },
      });

      this.notesService.getSharedUsers(this.noteId).subscribe({
        next: (response: any) => {
          response.forEach((element: any) => {
            this.selectedItems.push({
              id: element.sharedUser.id,
              username: element.sharedUser.userName,
            });
          });
        },
      });
    }
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'username',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 3,
      allowSearchFilter: true,
    };
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

  share(): void {
    const sharedUserIds: string[] = [];

    this.selectedItems.forEach((element: any) => {
      sharedUserIds.push(element.id);
    });

    const payload = {
      noteId: this.noteId,
      sharedUserIds,
    };
    this.notesService.createSharedNote(payload).subscribe({
      next: (response: any) => this.onSuccess(),
      error: (err) => (this.errorMessage = err),
    });
  }

  onSuccess(): void {
    this.modalService.dismissAll();
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
