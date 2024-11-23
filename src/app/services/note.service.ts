import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private baseUrl = 'http://localhost:3000/notes';

  async getNotes() {
    const response = await axios.get(this.baseUrl);
    return response.data;
  }

  async createNote(note: { title: string; content: string }) {
    const response = await axios.post(this.baseUrl, note);
    return response.data;
  }

  async updateNote(id: string, note: { title: string; content: string }) {
    const response = await axios.put(`${this.baseUrl}/${id}`, note);
    return response.data;
  }

  async deleteNote(id: string) {
    const response = await axios.delete(`${this.baseUrl}/${id}`);
    return response.data;
  }
}
