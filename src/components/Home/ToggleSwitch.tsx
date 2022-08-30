import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleTheme } from "../../features/thematic/darkModeSlice";

const ToggleSwitch = () => {
  // get theme from store
  const theme = useAppSelector((state) => state.darkMode);

  // initialize dispatch variable
  const dispatch = useAppDispatch();
  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
      }}
    >
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={theme.darkTheme}
              onChange={() => dispatch(toggleTheme())}
            />
          }
          label="Toggle Theme"
        />
      </FormGroup>
    </div>
  );
};

export default ToggleSwitch;
