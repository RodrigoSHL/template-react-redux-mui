import { Container, Box } from "@mui/material";
import styles from "./Calendar.module.css";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer, getMessages } from "../../helpers";
import CalendarEvent from "./CalendarEvent";
import { useEffect, useState } from "react";
import CalendarModal from "./CalendarModal";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import FabAddNew from "./FabAddNew";
import FabShareCalendar from "./FabShareCalendar";
const today = new Date();

const CalendarPage = () => {
  const { events, setActiveEvent, saveSelectedDateEvent, startLoadingEventsByUserId } = useCalendarStore();
  const { isDateModalOpen, openDateModal, closeDateModal } = useUiStore();
  const [lastView, setLastView] = useState<any>(
    localStorage.getItem("lastView") || "week"
  );

  const eventStyleGetter = (
    event: any,
    start: any,
    end: any,
    isSelected: any
  ) => {
    const style = {
      backgroundColor: event.take ? "#00695f" : "#1976d2",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
    return { style };
  };

  const onDoubleClick = (event: any) => {
    console.log({ doubleClick: event });
    openDateModal();
  };

  const onSelect = (event: any) => {
    console.log({ click: event });
    setActiveEvent(event);
  };

  const onViewChanged = (event: any) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  const selectEvent = async (slotInfo: any) => {
    const { start, end } = slotInfo;
    const agendaInfoDragDrop = {
      title: "Available time",
      notes: "Write notes",
      take: "",
      clientEmail: "some@some.cl",
      clientPhone: "+569 99999999",
      start: start,
      end: end,
      color: 'info'
    };
    await saveSelectedDateEvent(agendaInfoDragDrop);
  };

  useEffect(() => {
    startLoadingEventsByUserId()
  }, [])
  

  return (
    <>
      <Container maxWidth="lg">
        <Box className={styles.container}>
          <Box component="main" className={styles.containerTable}>
            <Calendar
              culture="es"
              localizer={localizer}
              defaultView={lastView}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "calc(90vh - 60px)" }}
              messages={getMessages()}
              eventPropGetter={eventStyleGetter}
              selectable
              components={{
                event: CalendarEvent,
              }}
              onDoubleClickEvent={onDoubleClick}
              onSelectEvent={onSelect}
              onView={onViewChanged}
              onSelectSlot={(slotInfo) => {
                console.log(slotInfo);
                selectEvent(slotInfo);
              }}
              min={
                new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate(),
                  8
                )
              }
              max={
                new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate(),
                  23
                )
              }
            />
            <CalendarModal
              openModal={isDateModalOpen}
              handleCloseModal={closeDateModal}
              handleOpenModal={openDateModal}
            />
            <FabAddNew />
            <FabShareCalendar />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CalendarPage;
