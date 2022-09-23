import { useEffect, useState } from "react";
import { Button, Modal, Box, Grid, TextField, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { addHours } from "date-fns";
import { es } from "date-fns/locale";
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

const CalendarModal = ({ openModal, handleCloseModal }: any) => {
  const { activeEvent, startTakingTimeByClient, setStartHour, setEndHour } =
    useCalendarStore();
  const [calendarObject, setCalendarObject] = useState<any>({
    clientEmail: "",
    clientPhone: "",
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
    if (calendarObject.clientEmail.length <= 0) return;
    const takeTimeInfo = {
      title: 'Not available',
      clientEmail: calendarObject.clientEmail,
      clientPhone: calendarObject.clientPhone,
      take: true,
    };
    console.log("takeTimeInfo", takeTimeInfo);
    await startTakingTimeByClient(takeTimeInfo);
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
        aria-labelledby="modal-modal-email"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-email" variant="h6" component="h2">
            {updateState
              ? "Update Event"
              : "Ingrese sus datos para confirmar hora"}
          </Typography>
          <Box component="form" onSubmit={submitForm} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
                  <DateTimePicker
                    label="Initial Date"
                    disabled
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
                    disabled
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
                  label="Ingresar correo electrónico"
                  variant="outlined"
                  fullWidth
                  name="clientEmail"
                  onChange={addDataInMemory}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Ingresar n° de teléfono"
                  variant="outlined"
                  fullWidth
                  required
                  name="clientPhone"
                  onChange={addDataInMemory}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}
                >
                  Save
                </Button>

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
