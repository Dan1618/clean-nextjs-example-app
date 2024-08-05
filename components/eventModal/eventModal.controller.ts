import { Dispatch, SetStateAction } from "react";
import { IRepository } from "../../repository/repository.interface";
import { addEventUseCase, checkEventExistsUseCase, deleteEventUseCase, editEventUseCase } from "./eventModal.use-cases";
import { ICalendarEvent } from "../calendarEvents/calendarEvent.entity";
import { TCalendarView } from "../calendarView.interface";
import { IEventsFormErrors } from "./eventModal.component";

export async function addCalendarEvent(
  repository: IRepository,
  { refreshCalendarView, refreshModalView, setFormErrors }: IAddCalendarEventContext,
  data: { formData: ICalendarEvent, currentDate: string }
) {
  const eventExists = await checkEventExistsUseCase(repository, data.formData.title);

  if (eventExists) {
    setFormErrors({ titleExists: true });
  } else {
    if (data.currentDate === data.formData.date) {
      const calendarViewData = await addEventUseCase(repository, { formData: data.formData });
      refreshCalendarView({
        currentDate: data.currentDate,
        events: calendarViewData
      });
      refreshModalView({ isOpen: false });
    } else {
      await addEventUseCase(repository, { formData: data.formData });
      refreshModalView({ isOpen: false });
    }
  }
}

export async function editCalendarEvent(
  repository: IRepository,
  { refreshCalendarView, refreshModalView }: IRefreshModalAndCalendar,
  data: { formData: ICalendarEvent, currentDate: string }
) {
  const calendarViewData = await editEventUseCase(repository, { formData: data.formData });
  refreshCalendarView({
    currentDate: data.currentDate,
    events: calendarViewData
  });
  refreshModalView({ isOpen: false });
}

export async function deleteCalendarEvent(
  repository: IRepository,
  { refreshCalendarView, refreshModalView }: IRefreshModalAndCalendar,
  data: { toDeleteId: string, currentDate: string }
) {
  const calendarViewData = await deleteEventUseCase(repository, data);
  refreshCalendarView({
    currentDate: data.currentDate,
    events: calendarViewData
  });
  refreshModalView({ isOpen: false });
}

export interface IAddCalendarEventContext extends IRefreshModalAndCalendar {
  setFormErrors: Dispatch<SetStateAction<IEventsFormErrors>>;
}

export interface IRefreshModalAndCalendar {
  refreshCalendarView: Dispatch<SetStateAction<TCalendarView>>;
  refreshModalView: Dispatch<SetStateAction<{ isOpen: boolean, eventDialogData?: ICalendarEvent }>>;
}