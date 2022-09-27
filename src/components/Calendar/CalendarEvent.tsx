const CalendarEvent = ({ event }: any) => {
  const { title } = event;
  return (
    <>
      <strong>{title}</strong>
      {/* <span> - {user?.name}</span> */}
    </>
  );
};

export default CalendarEvent;
