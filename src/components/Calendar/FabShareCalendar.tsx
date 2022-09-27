import { Fab, Tooltip } from "@mui/material";
import styles from "./Calendar.module.css";
import ShareIcon from "@mui/icons-material/Share";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useAppDispatch } from "../../app/hooks";
import { setOpenSnackbar } from "../../features/snackbar/snackbarSlice";
import { infoColor } from "../Middleware/Snackbar";
const objSuccess = {isOpen: true, message: 'Copied', severity: infoColor, timeOut : 2000}

const FabShareCalendar = () => {

  const {user} = useAuthStore();
  const dispatch = useAppDispatch();

  const copyToClipboard = (e: any) => {
    e.preventDefault();
    var aux = document.createElement("input");
    aux.setAttribute("value", `https://www.atomdev.cl/#/calendar/${user.uid}`);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    dispatch(setOpenSnackbar(objSuccess))
  };

  return (
    <>
      <Tooltip title={`https://www.atomdev.cl/#/calendar/${user.uid}`} placement="right-start">
        <Fab
          onClick={(e: any) => copyToClipboard(e)}
          className={styles.delFab}
          style={{ marginLeft: "10px" }}
          color="info"
          aria-label="add"
        >
          <ShareIcon />
        </Fab>
      </Tooltip>
    </>
  );
};

export default FabShareCalendar;
