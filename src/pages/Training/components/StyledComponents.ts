import { TableRow, colors, styled } from "@mui/material";

export const StyledTableRowHead = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.action.disabled,
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.focus,
    },
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));