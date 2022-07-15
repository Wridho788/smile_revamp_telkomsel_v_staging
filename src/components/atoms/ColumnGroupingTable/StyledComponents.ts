import React from "react";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const StyledTitle = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  textAlign: "center",
  paddingBlock: "1.2vw",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  marginBottom: "0.2vw",
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.secondary.dark,
    fontSize: theme.typography.subtitle1.fontSize,
    fontBold: theme.typography.subtitle1.fontBold,
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: theme.palette.background.default,
    fontSize: 14,
  },
}));
