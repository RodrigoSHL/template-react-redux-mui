import { Fab } from "@mui/material";
import styles from "./Calendar.module.css";
import AddIcon from "@mui/icons-material/Add";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { addHours } from "date-fns";

const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const onClickAddButton = (e: any) => {
    e.preventDefault();
    openDateModal();
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 1),
      bgColor: 'green',
      user: {
        _id: "123",
        name: "Rodrigo Catalan",
      },
    });
  };
  return (
    <Fab
      onClick={(e: any) => onClickAddButton(e)}
      className={styles.fab}
      color="primary"
      aria-label="add"
    >
      <AddIcon />
    </Fab>
  );
};

export default FabAddNew;
