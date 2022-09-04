import { Box } from "@mui/material";
import React from "react";
import Table from "./Table";

const Pokemon = () => {
  return (
    <Box
      sx={{
        flexDirection: "row",
      }}
    >
      <Box>
        <Table />
      </Box>
    </Box>
  );
};

export default Pokemon;
