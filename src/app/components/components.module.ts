import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { CardNotesComponent } from './card-notes/card-notes.component';

@NgModule({
  declarations: [
    HeaderComponent,
    CardNotesComponent
  ],
  exports:[
    HeaderComponent,
    CardNotesComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
