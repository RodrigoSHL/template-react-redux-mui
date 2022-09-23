import { Fab } from "@mui/material";
import styles from "./Calendar.module.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { addHours } from "date-fns";

const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent, startDeleteEvent, hasEventSelected } = useCalendarStore();

  const onClickAddButton = (e: any) => {
    e.preventDefault();
    openDateModal();
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 1)
    });
  };

  const onClickDeleteButton = (e: any) => {
    e.preventDefault();
    startDeleteEvent();
  };
  

  
  return (
    <>
     <Fab
      onClick={(e: any) => onClickAddButton(e)}
      className={styles.addFab}
      color="primary"
      aria-label="add"
    >
      <AddIcon />
    </Fab>
    <Fab
      onClick={(e: any) => onClickDeleteButton(e)}
      className={styles.delFab}
      color="error"
      aria-label="del"
      style={{
        display: hasEventSelected ? '' : 'none'
      }}
    >
      <DeleteIcon />
    </Fab>
    </>
   
    
  );
};

export default FabAddNew;
