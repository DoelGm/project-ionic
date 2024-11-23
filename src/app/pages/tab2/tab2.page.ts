import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  note = { title: '', content: '' }; // Objeto para almacenar datos de la nota
  isEditing = false; // Bandera para saber si es una edición
  noteId: string | null = null; // ID de la nota que se está editando

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    const noteToEdit = localStorage.getItem('noteToEdit');
    if (noteToEdit) {
      const note = JSON.parse(noteToEdit);
      this.note = { title: note.title, content: note.content };
      this.noteId = note._id;
      this.isEditing = true;
      localStorage.removeItem('noteToEdit');
    }
  }

  // Función para crear o actualizar una nota
  async saveNote() {
    try {
      if (this.isEditing && this.noteId) {
        // Actualizar nota existente
        await this.noteService.updateNote(this.noteId, this.note);
        alert('Nota actualizada con éxito');
      } else {
        // Crear nueva nota
        await this.noteService.createNote(this.note);
        alert('Nota creada con éxito');
      }
      this.note = { title: '', content: '' }; // Limpiar formulario
      this.isEditing = false;
      this.noteId = null;
    } catch (error) {
      console.error('Error al guardar la nota:', error);
      alert('Error al guardar la nota');
    }
  }
}
