import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  onAddNewEvent,
  onSetActiveEvent,
  onUpdateNewEvent,
  onChangeStart,
  onChangeEnd,
} from "../features/calendar/calendarSlice";
import { onCloseDateModal } from "../features/ui/uiSlice";

export const useCalendarStore = () => {
  const { events, activeEvent } = useAppSelector((state) => state.calendar);

  const dispatch = useAppDispatch();

  const setActiveEvent = (calendarEvent: any) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const saveDateEvent = (calendarObjectInfo: any) => {
    if (calendarObjectInfo._id) {
      dispatch(onUpdateNewEvent({ ...calendarObjectInfo }));
    } else {
      dispatch(
        onAddNewEvent({ ...calendarObjectInfo, _id: new Date().getTime() })
      );
    }
    dispatch(onCloseDateModal());
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

    //* Methods
    setActiveEvent,
    saveDateEvent,
    saveSelectedDateEvent,
    setStartHour,
    setEndHour,
  };
};