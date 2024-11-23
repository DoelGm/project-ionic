import { Component, Input } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
@Component({
  selector: 'card-notes',
  templateUrl: './card-notes.component.html',
  styleUrls: ['./card-notes.component.scss'],
})


export class CardNotesComponent {

  constructor(private noteService: NoteService) {}
  @Input() date: string = '';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() content: string = '';

  notes: any[] = []; // Notas cargadas desde el backend

  async ngOnInit() {
    this.loadNotes();
  }

    // Carga las notas
    async loadNotes() {
      this.notes = await this.noteService.getNotes();
    }


  async deleteNote(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar esta nota?')) {
      try {
        await this.noteService.deleteNote(id);
        this.loadNotes();
        alert('Nota eliminada con éxito');
      } catch (error) {
        console.error('Error al eliminar la nota:', error);
        alert('Error al eliminar la nota');
      }
    }
  }

  // Edita una nota (redirige a Tab2 con los datos de la nota a editar)
  async editNote(note: any) {
    // Guarda los datos en localStorage (u otro mecanismo) para pasarlos a Tab2
    localStorage.setItem('noteToEdit', JSON.stringify(note));
    location.href = '/tabs/tab2';
  }
}
