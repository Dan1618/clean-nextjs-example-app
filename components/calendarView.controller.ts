import moment from "moment";
import { IRepository } from "../repository/repository.interface";
import { changeCalendarDateUseCase, searchEventUseCase } from "./calendarView.use-cases";
import { TCalendarView } from "./calendarView.interface";
import { Dispatch, SetStateAction } from "react";

export async function nextCalendarView(
  repository: IRepository,
  refreshCalendarView: Dispatch<SetStateAction<TCalendarView>>,
  data: { currentDate: string }
) {
  const newDayDate = moment(data.currentDate).add(1, 'days').format('YYYY-MM-DD');
  const newDayData = await changeCalendarDateUseCase(
    repository,
    { followingDate: newDayDate }
  );
  refreshCalendarView({
    events: newDayData,
    currentDate: newDayDate
  });
}

export async function prevCalendarView(
  repository: IRepository,
  refreshCalendarView: Dispatch<SetStateAction<TCalendarView>>,
  data: { currentDate: string }
) {
  const newDayDate = moment(data.currentDate).add(-1, 'days').format('YYYY-MM-DD');
  const newDayData = await changeCalendarDateUseCase(
    repository,
    { followingDate: newDayDate }
  );
  refreshCalendarView({
    events: newDayData,
    currentDate: newDayDate
  });
}

export async function fetchCalendarEventData(
  repository: IRepository,
  refreshCalendarView: Dispatch<SetStateAction<TCalendarView>>,
  date: string
) {
  const newDayData = await changeCalendarDateUseCase(
    repository,
    { followingDate: date }
  );
  refreshCalendarView({
    events: newDayData,
    currentDate: date
  });
}

export async function searchCalendarEvent(
  repository: IRepository,
  refreshCalendarView: Dispatch<SetStateAction<TCalendarView>>,
  data: { searched: string, dateValue: string }
) {
  const searchedEvents = await searchEventUseCase(repository, data);
  refreshCalendarView({
    events: searchedEvents,
    currentDate: data.dateValue
  });
}