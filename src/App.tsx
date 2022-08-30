import { ThemeProvider } from "@mui/material/styles";
import { useAppSelector } from "./app/hooks";
import { darkTheme, lightTheme } from "./components/theme/theme";
import Home from "./components/Home/Home";


export default function App() {
  const theme = useAppSelector((state) => state.darkMode);

  return (
    <ThemeProvider theme={theme.darkTheme ? darkTheme : lightTheme}>
      <Home/>
    </ThemeProvider>
  );
}