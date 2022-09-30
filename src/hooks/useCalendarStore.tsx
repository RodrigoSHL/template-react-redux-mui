import calendarApi from "../api/calendarApi";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { errorColor, infoColor, successColor } from "../components/Middleware/Snackbar";
import {
  onAddNewEvent,
  onSetActiveEvent,
  onUpdateNewEvent,
  onChangeStart,
  onChangeEnd,
  onDeleteEvent,
  onLoadEvents,
} from "../features/calendar/calendarSlice";
import { setOpenSnackbar } from "../features/snackbar/snackbarSlice";
import { onCloseDateModal } from "../features/ui/uiSlice";
import { convertEventsToDateEvents } from "../helpers";
import { IClientTakeTime } from "../interfaces/IClientTakeTime.interface";

const objError = {
  isOpen: true,
  message: "Problems with server",
  severity: errorColor,
  timeOut: 4000,
};

const objDeleteSuccess = {
  isOpen: true,
  message: "Time delete",
  severity: infoColor,
  timeOut: 2000,
};

const objTakeSuccess = {
  isOpen: true,
  message: "The time was taken successfully",
  severity: successColor,
  timeOut: 4000,
};

const objUpdatedSuccess = {
  isOpen: true,
  message: "The time was updated successfully",
  severity: successColor,
  timeOut: 2000,
};

export const useCalendarStore = () => {
  const { events, activeEvent } = useAppSelector((state) => state.calendar);
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const setActiveEvent = (calendarEvent: any) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  

  const startSavingEvent = async (calendarObjectInfo: any) => {
    try {
      if (calendarObjectInfo._id) {
        //update
        await calendarApi.patch(`event/${calendarObjectInfo._id}`, calendarObjectInfo);
        dispatch(onUpdateNewEvent({ ...calendarObjectInfo, user }));
        dispatch(setOpenSnackbar(objUpdatedSuccess))
        return;
      }
      //create
      const { data } = await calendarApi.post("event", calendarObjectInfo);
      dispatch(onAddNewEvent({ ...calendarObjectInfo, _id: data._id, user }));
      dispatch(onCloseDateModal());
    } catch (error) {
      console.log("error", error);
      dispatch(setOpenSnackbar(objError))
    }
  };

  const startDeleteEvent = async () => {
    //TODO: go to backend
    try {
      await calendarApi.delete(`event/${activeEvent._id}`);
      dispatch(setOpenSnackbar(objDeleteSuccess))
    } catch (error) {
      dispatch(setOpenSnackbar(objError))
    }
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

  const startLoadingEventsByUserId = async () => {
    console.log('user', user)
    try {
      const { data } = await calendarApi.get(`event/user/`);
      const events = convertEventsToDateEvents(data);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log("Error, loading events...");
      console.log(error);
    }
  };

  const startLoadingEventsByUrlId = async ( id: any ) => {
    try {
      const { data } = await calendarApi.get(`event/user/${id}`);
      const events = convertEventsToDateEvents(data);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log("Error, loading events...");
      console.log(error);
    }
  };

  const startTakingTimeByClient = async ( clientTakeTime: IClientTakeTime ) => {
    try {
      await calendarApi.patch(`event/take/${activeEvent._id}`, clientTakeTime);
      dispatch(onUpdateNewEvent({ ...activeEvent, take: true, title: clientTakeTime.title }));
      dispatch(setOpenSnackbar(objTakeSuccess))
      dispatch(onCloseDateModal());
      return;
    } catch (error) {
      dispatch(setOpenSnackbar(objError))
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
    startLoadingEventsByUrlId,
    startLoadingEventsByUserId,
    startSavingEvent,
    startTakingTimeByClient,
  };
};
