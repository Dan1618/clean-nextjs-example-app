import { CalendarViewComponent } from "../../components/calendarView.component";
import { RepositoryContext } from "../../repository/repositoryContext";
import { GraphQLRepository } from "../../repository/graphql.repository";
import { RepositoryImpl } from "../../repository/repositoryImpl";

export default function CalendarPage() {

  const repository = new RepositoryImpl(new GraphQLRepository())

  return (
    <RepositoryContext.Provider value={{ repository }}>
      <CalendarViewComponent>
      </CalendarViewComponent>
    </RepositoryContext.Provider>
  );
}
