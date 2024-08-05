import { ICalendarEvent } from "../components/calendarEvents/calendarEvent.entity";
import { IRepository } from "./repository.interface";

export class GraphQLRepository implements IRepository {
  searchCalendarByTitle = (title: string, dateValue: string): EventsResponse => {
    return client(GET_EVENTS(), { title, date: dateValue })
  };

  getCalendarViewByDate = (dateValue: string): EventsResponse => {
    return client(GET_EVENTS(), { title: '', date: dateValue });
  };

  checkCalendarEventExists = (title: string): Promise<{ data: { itemExists: { exists: false; } } }> => {
    return client(CHECK_EVENT_EXISTS(), { title });
  };

  addCalendarEvent = (newEvent: ICalendarEvent): Promise<{ data: { addEvent: ICalendarEvent[] } }> => {
    return client(ADD_NEW_EVENT(), { newEvent });
  }

  editCalendarEvent = (editedEvent: ICalendarEvent): Promise<{ data: { editEvent: ICalendarEvent[] } }> => {
    return client(EDIT_EVENT(), { editedEvent })
  };

  deleteCalendarEvent = (toDeleteId: string, currentDate: string): Promise<{ data: { deleteEvent: ICalendarEvent[] } }> => {
    return client(DELETE_EVENT(), { toDeleteId, currentDate })
  };
}

export type EventsResponse = Promise<{ data: { events: ICalendarEvent[] } }>

const client = async (query: string, variables?: any) => {
  return await fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: variables ?? undefined,
    }),
  }).then((response) => response.json());
};

const GET_EVENTS = () => {
  return `
    query GetEventsByTitle($title: String!, $date: String!) {
      events(title: $title, date: $date) {
        id
        title
        start
        date
        end
      }
    }`;
};

const CHECK_EVENT_EXISTS = () => {
  return `
    query ItemExists($title: String!) {
        itemExists(title: $title) {
          exists
        }
      }
    `;
};

const ADD_NEW_EVENT = () => {
  return `
    mutation AddEvent($newEvent: EventInput!) {
      addEvent(event: $newEvent ) 
      {
          id
          title
          start
          date
          end
      }
    }`;
};

const EDIT_EVENT = () => {
  return `
    mutation EditEvent($editedEvent: EventInput!) {
      editEvent(event: $editedEvent ) 
      {
          id
          title
          start
          date
          end
      }
    }`;
};

const DELETE_EVENT = () => {
  return `
    mutation DeleteEvent($toDeleteId: ID!, $currentDate: String!) {
      deleteEvent(toDeleteId: $toDeleteId , currentDate: $currentDate) 
      {
          id
          title
          start
          date
          end
      }
    }`;
};



