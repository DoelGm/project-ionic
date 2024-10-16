import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-notes',
  templateUrl: './card-notes.component.html',
  styleUrls: ['./card-notes.component.scss'],
})
export class CardNotesComponent  implements OnInit {
  @Input () date?: string;
  constructor() { }

  ngOnInit() {}

}
