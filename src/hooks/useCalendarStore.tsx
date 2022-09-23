import calendarApi from "../api/calendarApi";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  onAddNewEvent,
  onSetActiveEvent,
  onUpdateNewEvent,
  onChangeStart,
  onChangeEnd,
  onDeleteEvent,
  onLoadEvents,
} from "../features/calendar/calendarSlice";
import { onCloseDateModal } from "../features/ui/uiSlice";
import { convertEventsToDateEvents } from "../helpers";

export const useCalendarStore = () => {
  const { events, activeEvent } = useAppSelector((state) => state.calendar);
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const setActiveEvent = (calendarEvent: any) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarObjectInfo: any) => {
    if (calendarObjectInfo._id) {
      //update
      await calendarApi.patch(
        `event/${calendarObjectInfo._id}`,
        calendarObjectInfo
      );
      dispatch(onUpdateNewEvent({ ...calendarObjectInfo, user }));
    } else {
      //create
      const { data } = await calendarApi.post("event", calendarObjectInfo);
      console.log("data", { data });
      dispatch(onAddNewEvent({ ...calendarObjectInfo, _id: data._id, user }));
    }
    dispatch(onCloseDateModal());
  };

  const startDeleteEvent = () => {
    //TODO: go to backend
    dispatch(onDeleteEvent());
  };

  const saveSelectedDateEvent = async (calendarObjectInfo: any) => {
    const { data } = await calendarApi.post("event", calendarObjectInfo);
    console.log("data", { data });
    dispatch(onAddNewEvent({ ...calendarObjectInfo, _id: data._id, user }));
  };

  const setStartHour = (startHour: any) => {
    dispatch(onChangeStart(startHour));
  };

  const setEndHour = (endHour: any) => {
    dispatch(onChangeEnd(endHour));
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("event");
      const events = convertEventsToDateEvents(data);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log("Error, loading events...");
      console.log(error);
    }
  };

  return {
    //* Properties
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,
    onUpdateNewEvent,

    //* Methods
    saveSelectedDateEvent,
    setActiveEvent,
    setEndHour,
    setStartHour,
    startDeleteEvent,
    startLoadingEvents,
    startSavingEvent,
  };
};
