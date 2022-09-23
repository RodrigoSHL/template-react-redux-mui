import { Container, Box } from "@mui/material";
import styles from "./Calendar.module.css";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer, getMessages } from "../../helpers";
import { useEffect, useState } from "react";
import CalendarPublicModal from "./CalendarPublicModal";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useParams } from "react-router-dom";

const today = new Date();

const CalendarPublicPage = () => {
  const { events, setActiveEvent, startLoadingEventsByUrlId } =
    useCalendarStore();
  const { isDateModalOpen, openDateModal, closeDateModal } = useUiStore();
  const [lastView, setLastView] = useState<any>(
    localStorage.getItem("lastView") || "week"
  );

  const params = useParams();

  const eventStyleGetter = (
    event: any,
    start: any,
    end: any,
    isSelected: any
  ) => {
    const style = {
      backgroundColor: event.take ? "#F9861A" : "#1976d2",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
    return { style };
  };

  const onDoubleClick = (event: any) => {
    console.log({ doubleClick: event });
    if( !event.take ) openDateModal();

  };

  const onSelect = (event: any) => {
    setActiveEvent(event);
  };

  const onViewChanged = (event: any) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  useEffect(() => {
    startLoadingEventsByUrlId(params.id);
  }, []);

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
