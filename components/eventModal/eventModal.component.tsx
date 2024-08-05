import { Dispatch, FunctionComponent, SetStateAction, useContext, useState } from "react";
import { RepositoryContext } from "../../repository/repositoryContext";
import { ICalendarEvent } from "../calendarEvents/calendarEvent.entity";
import EventModalWrapperComponent from "./eventModalWrapper.component";
import { addCalendarEvent, deleteCalendarEvent, editCalendarEvent } from "./eventModal.controller";
import { TCalendarView } from "../calendarView.interface";
import { v4 as uuidv4 } from 'uuid';

export const EventModalComponent: FunctionComponent<CalendarViewProps> = (
  props
) => {
  const { repository } = useContext(RepositoryContext);
  const [formErrors, setFormErrors] = useState<IEventsFormErrors>({
    titleExists: false,
    // ...
  });

  const [calendarEventData, setEventData] = useState<ICalendarEvent>(
    props.eventDialogData ? props.eventDialogData : {
      end: 0,
      id: uuidv4(),
      start: 0,
      date: props.currentDate,
      title: '',
    });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEventData({ ...calendarEventData, [name]: value });
  };

  const handleSubmit = () => {
    if (props.eventDialogData) {
      editCalendarEvent(
        repository,
        {
          refreshCalendarView: props.refreshCalendarData,
          refreshModalView: props.setEventDialog,
        },
        { formData: { ...calendarEventData, end: Number(calendarEventData.end), start: Number(calendarEventData.start) }, currentDate: props.currentDate }
      );
    } else {
      addCalendarEvent(
        repository,
        {
          refreshCalendarView: props.refreshCalendarData,
          refreshModalView: props.setEventDialog,
          setFormErrors: setFormErrors
        },
        { formData: { ...calendarEventData, end: Number(calendarEventData.end), start: Number(calendarEventData.start) }, currentDate: props.currentDate }
      );
    }
  };

  return (
    <>
      <EventModalWrapperComponent
        title={props.eventDialogData ? ModalType.EditEvent : ModalType.AddEvent}
        setOpenEventDialog={props.setEventDialog}>
        <div className="p-4">
          <label className="text-sm font-medium" htmlFor="title">Title:</label>
          <input
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-sky-500 m-2"
            type="text" id="title" name="title" value={calendarEventData.title} onChange={handleChange} required />
          {formErrors.titleExists && <p className="text-red-500">Event with this title already exists</p>}
          <br />

          <label className="text-sm font-medium" htmlFor="date">Date:</label>
          <input
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-sky-500 m-2"
            type="date" id="date" name="date" placeholder="dd-mm-yyyy" value={calendarEventData.date} onChange={handleChange} required />
          <br />

          <label className="text-sm font-medium" htmlFor="start">Start Time:</label>
          <input
            min="0" max="1400"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-sky-500 m-2"
            type="number" id="start" name="start" value={calendarEventData.start} onChange={handleChange} required />
          <br />

          <label className="text-sm font-medium" htmlFor="end">End Time:</label>
          <input
            min="0" max="1400"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-sky-500 m-2"
            type="number" id="end" name="end" value={calendarEventData.end} onChange={handleChange} required />

          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            {props.eventDialogData && <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => deleteCalendarEvent(
                repository,
                {
                  refreshCalendarView: props.refreshCalendarData,
                  refreshModalView: props.setEventDialog
                },
                { toDeleteId: calendarEventData.id, currentDate: props.currentDate }
              )}>Delete Event</button>}
            <button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => handleSubmit()}>{props.eventDialogData ? ModalType.EditEvent : ModalType.AddEvent}</button>
          </div>
        </div>
      </EventModalWrapperComponent>
    </>
  );
};

type CalendarViewProps = {
  currentDate: string;
  refreshCalendarData: Dispatch<SetStateAction<TCalendarView>>;
  setEventDialog: Dispatch<SetStateAction<{ isOpen: boolean, eventDialogData?: ICalendarEvent }>>;
  eventDialogData?: ICalendarEvent;
};

enum ModalType {
  AddEvent = "Add event",
  EditEvent = "Edit event"
}

export interface IEventsFormErrors {
  titleExists: boolean
}