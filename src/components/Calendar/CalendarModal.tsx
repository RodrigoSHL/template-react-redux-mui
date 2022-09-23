import { useEffect, useState } from "react";
import { Button, Modal, Box, Grid, TextField, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { addHours, differenceInSeconds } from "date-fns";
import { es } from "date-fns/locale";
import { useAppDispatch } from "../../app/hooks";
import { errorColor } from "../Middleware/Snackbar";
import { openSnackbar } from "../../features/snackbar/snackbarSlice";
import { useCalendarStore } from "../../hooks/useCalendarStore";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};
const dateError = {
  isOpen: true,
  message: "Incorrect dates",
  severity: errorColor,
  timeOut: 2000,
};

const CalendarModal = ({ openModal, handleCloseModal }: any) => {
  const dispatch = useAppDispatch();
  const { activeEvent, startSavingEvent, setStartHour, setEndHour } =
    useCalendarStore();
  const [calendarObject, setCalendarObject] = useState<any>({
    _id: "",
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 1),
  });

  useEffect(() => {
    if (activeEvent !== null) {
      setCalendarObject({ ...activeEvent });
    }
  }, [activeEvent]);

  const [updateState, setUpdateState] = useState(false);

  const addDataInMemory = (e: any) => {
    const { name, value } = e.target;
    setCalendarObject((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    const difference = differenceInSeconds(valueEndDate, valueInitialDate);
    if (isNaN(difference) || difference <= 0) {
      dispatch(openSnackbar(dateError));
      return;
    }
    if (calendarObject.title.length <= 0) return;
    const agendaInfo = {
      _id: activeEvent ? activeEvent._id : null,
      title: calendarObject.title,
      notes: calendarObject.notes,
      take: "",
      start: activeEvent ? activeEvent.start : valueInitialDate,
      end: activeEvent ? activeEvent.end : valueEndDate,
    };
    // console.log("agendaInfo", agendaInfo);
    await startSavingEvent(agendaInfo);
  };

  const [valueInitialDate, setValueInitialDate] = useState<Date>(new Date());

  const [valueEndDate, setValueEndDate] = useState<Date>(
    addHours(new Date(), 1)
  );

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {updateState ? "Update Event" : "New Event"}
          </Typography>
          <Box component="form" onSubmit={submitForm} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
                  <DateTimePicker
                    label="Initial Date"
                    value={activeEvent ? activeEvent.start : valueInitialDate}
                    onChange={(newValue: any) => {
                      setValueInitialDate(newValue);
                      setStartHour({
                        start: newValue,
                      });
                    }}
                    renderInput={(params: any) => (
                      <TextField fullWidth {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
                  <DateTimePicker
                    label="End Date"
                    value={activeEvent ? activeEvent.end : valueEndDate}
                    onChange={(newValue: any) => {
                      setValueEndDate(newValue);
                      setEndHour({
                        end: newValue,
                      });
                    }}
                    renderInput={(params: any) => (
                      <TextField fullWidth {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="In title"
                  variant="outlined"
                  fullWidth
                  name="title"
                  onChange={addDataInMemory}
                  value={calendarObject.title}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="In notes"
                  variant="outlined"
                  fullWidth
                  required
                  name="notes"
                  onChange={addDataInMemory}
                  value={calendarObject.notes}
                  multiline
                  rows={4}
                  maxRows={5}
                />
              </Grid>
              <Grid item xs={12}>
                {updateState ? (
                  <Button
                    type="submit"
                    color="warning"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Save
                  </Button>
                )}

                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CalendarModal;
