import { createServer } from "@graphql-yoga/node";
import { EventService } from "../../service/eventService";
import { ICalendarEvent } from "../../components/calendarEvents/calendarEvent.entity";

const typeDefs = /* GraphQL */ `
  input EventInput {
    id: ID!
    title: String!
    start: Int!
    date: String!
    end: Int!
  }

  type Event {
    id: ID!
    title: String!
    start: Int!
    date: String!
    end: Int!
  }

  type ExistsResponse {
    exists: Boolean
  }

  type Query {
    events(title: String, date: String): [Event]
    itemExists(title: String!): ExistsResponse!
  }

  type Mutation {
    addEvent(event: EventInput!): [Event]!
    editEvent(event: EventInput!): [Event]!
    deleteEvent(toDeleteId: ID!, currentDate: String!): [Event]!
  }
`;

const resolvers = {
  Query: {
    async events(parent, input, { eventService }) {
      const { date, title } = input;
      return (await eventService.readDataFromFile())
        .filter((el) => {
          if (date) { return el.date == date; }
          else { return true; }
        }).filter((el) => {
          if (title) {
            return el.title.toLowerCase().includes(title.toLowerCase());
          } else { return true; }
        })
    },
    async itemExists(parent, input, { eventService }) {
      const { title } = input;

      return {
        exists: (await eventService.readDataFromFile())
          .findIndex((el) => {
            if (title) {
              return el.title.toLowerCase() === title.toLowerCase();
            } else { return true; }
          }) !== -1
      };
    },
  },
  Mutation: {
    async addEvent(parent, input, { eventService }) {
      await eventService.saveDataToFile(input.event);

      return (await eventService.readDataFromFile()).filter((el) => {
        return el.date == input.event.date;
      });
    },
    async deleteEvent(parent, input, { eventService }) {
      await eventService.removeDataFromFile(input.toDeleteId);

      return (await eventService.readDataFromFile()).filter((el) => {
        return el.date == input.currentDate;
      });
    },
    async editEvent(parent, input, { eventService }) {
      await eventService.editDataToFile(input.event);

      return (await eventService.readDataFromFile()).filter((el) => {
        return el.date == input.event.date;
      });
    },
  }
};

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  endpoint: "/api/graphql",
  context: {
    eventService: new EventService<ICalendarEvent>("./service/data.json"),
  },
});

export default server;
