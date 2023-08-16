import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyNotesComponent } from './my-notes/my-notes.component';
import { TabsComponent } from './tabs/tabs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotesComponent } from './notes/notes.component';
import { NotesItemComponent } from './notes-item/notes-item.component';
import { AddNoteComponent } from './add-note/add-note.component';

import { MomentModule } from 'ngx-moment';
import { ShareNoteComponent } from './share-note/share-note.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    MyNotesComponent,
    TabsComponent,
    NotesComponent,
    NotesItemComponent,
    AddNoteComponent,
    ShareNoteComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    MomentModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
})
export class MyNotesModule {}
