import { Container, Box } from "@mui/material";
import styles from "./Calendar.module.css";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer, getMessages } from "../../helpers";
import { useState } from "react";
import CalendarPublicModal from "./CalendarPublicModal";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";

const today = new Date();

const CalendarPublicPage = () => {
  const { events, setActiveEvent, saveSelectedDateEvent } = useCalendarStore();
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
      backgroundColor: event.bgColor,
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
    const style = {
      backgroundColor: "#f50057",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };      
    return { style };
  };
  
  const onViewChanged = (event: any) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  const selectEvent = async (slotInfo: any) => {
    const { start, end } = slotInfo;
    const agendaInfoDragDrop = {
      _id: new Date().getTime(),
      title: "Title",
      notes: "Nota",
      start: start,
      end: end,
      bgColor: "#fafafa",
      user: {
        _id: "123",
        name: "Rodrigo Catalan",
      },
    };
    console.log("agendaInfoDragDrop", agendaInfoDragDrop);
    await saveSelectedDateEvent(agendaInfoDragDrop);
  };

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
            <CalendarPublicModal
              openModal={isDateModalOpen}
              handleCloseModal={closeDateModal}
              handleOpenModal={openDateModal}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CalendarPublicPage;
