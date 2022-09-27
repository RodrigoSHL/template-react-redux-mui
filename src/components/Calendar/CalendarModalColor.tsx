import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RowRadioButtonsGroup({ color, setColor }: any) {
  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor((e.target as HTMLInputElement).value);
  };
  return (
    <FormControl>
      <FormLabel id="color-select">Color</FormLabel>
      <RadioGroup
        row
        aria-labelledby="color-select"
        name="color"
        value={color}
        onChange={handleChangeColor}
      >
        <FormControlLabel
          value="#2196f3"
          control={
            <Radio
              sx={{
                color: "#2196f3",
                "&.Mui-checked": {
                  color: "#2196f3",
                },
              }}
            />
          }
          label=""
        />
        <FormControlLabel
          value="#f44336"
          control={
            <Radio
              sx={{
                color: "#f44336",
                "&.Mui-checked": {
                  color: "#f44336",
                },
              }}
            />
          }
          label=""
        />
        <FormControlLabel
          value="#8bc34a"
          control={
            <Radio
              sx={{
                color: "#8bc34a",
                "&.Mui-checked": {
                  color: "#8bc34a",
                },
              }}
            />
          }
          label=""
        />
        <FormControlLabel
          value="#ffeb3b"
          control={
            <Radio
              sx={{
                color: "#ffeb3b",
                "&.Mui-checked": {
                  color: "#ffeb3b",
                },
              }}
            />
          }
          label=""
        />
        <FormControlLabel
          value="#009688"
          control={
            <Radio
              sx={{
                color: "#009688",
                "&.Mui-checked": {
                  color: "#009688",
                },
              }}
            />
          }
          label=""
        />
        <FormControlLabel
          value="#9c27b0"
          control={
            <Radio
              sx={{
                color: "#9c27b0",
                "&.Mui-checked": {
                  color: "#9c27b0",
                },
              }}
            />
          }
          label=""
        />
        <FormControlLabel
          value="#e91e63"
          control={
            <Radio
              sx={{
                color: "#e91e63",
                "&.Mui-checked": {
                  color: "#e91e63",
                },
              }}
            />
          }
          label=""
        />
        <FormControlLabel
          value="#ff9800"
          control={
            <Radio
              sx={{
                color: "#ff9800",
                "&.Mui-checked": {
                  color: "#ff9800",
                },
              }}
            />
          }
          label=""
        />
      </RadioGroup>
    </FormControl>
  );
}
