import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  onAddNewEvent,
  onSetActiveEvent,
  onUpdateNewEvent,
  onChangeStart,
  onChangeEnd,
  onDeleteEvent,
} from "../features/calendar/calendarSlice";
import { onCloseDateModal } from "../features/ui/uiSlice";

export const useCalendarStore = () => {
  const { events, activeEvent } = useAppSelector((state) => state.calendar);

  const dispatch = useAppDispatch();

  const setActiveEvent = (calendarEvent: any) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = (calendarObjectInfo: any) => {
    //TODO: go to backend

    //if all ok 
    if (calendarObjectInfo._id) {
      dispatch(onUpdateNewEvent({ ...calendarObjectInfo }));
    } else {
      dispatch(
        onAddNewEvent({ ...calendarObjectInfo, _id: new Date().getTime() })
      );
    }
    dispatch(onCloseDateModal());
  };

  const startDeleteEvent = () => {
    //TODO: llegar al backend

    
    dispatch(onDeleteEvent());
  };

  const saveSelectedDateEvent = (calendarObjectInfo: any) => {
    dispatch(onAddNewEvent({ ...calendarObjectInfo }));
  };

  const setStartHour = (startHour: any) => {
    dispatch(onChangeStart(startHour));
  };

  const setEndHour = (endHour: any) => {
    dispatch(onChangeEnd(endHour));
  };

  return {
    //* Properties
    events,
    activeEvent,
    onUpdateNewEvent,
    hasEventSelected: !!activeEvent,

    //* Methods
    setActiveEvent,
    startSavingEvent,
    saveSelectedDateEvent,
    startDeleteEvent,
    setStartHour,
    setEndHour,
  };
};
