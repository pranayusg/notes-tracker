import { Component, Input } from '@angular/core';

@Component({
  selector: 'note-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent {
  @Input() reloadNotes = false;
  active = 1;
}
