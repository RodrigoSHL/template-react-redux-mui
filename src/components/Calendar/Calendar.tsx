import { Container, Box,  } from "@mui/material"
import styles from "./Calendar.module.css";
const Calendar = () => {
  return (
    <>
    <Container maxWidth="lg">
      <Box className={styles.container}>
        <Box component="main" className={styles.containerTable}>
          <h1>Calendar</h1>
         
        </Box>
      </Box>
    </Container>
  </>  )
}

export default Calendar