declare namespace gapi.client.calendar {
    interface Event {
      id: string;
      summary: string;
      start: {
        dateTime?: string; // El tiempo puede ser opcional
        date?: string;
      };
      end: {
        dateTime?: string; // El tiempo puede ser opcional
        date?: string;
      };
      // Agrega más propiedades según lo necesites
    }
  
    interface CalendarEventList {
      result: any;
      items: Event[];
    }
  
    interface EventsResource {
      list(params: {
        calendarId: string;
        timeMin: string;
        showDeleted: boolean;
        singleEvents: boolean;
        maxResults: number;
        orderBy: string;
      }): Promise<CalendarEventList>;
    }
  
    const events: EventsResource; // Asegúrate de declarar esto como un recurso
  }
  