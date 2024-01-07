import React, { useState } from "react";
import { Icon } from '@iconify/react';
import { Box, Button, Collapse, TableCell, TableRow } from "@mui/material";

/**
 * Components - global
 * ========================
*/

/* types */
import { TrainingDataType } from "../model/Types";
import TrainingForm from "./TrainingSingleForm";

/* Components */


/* Props */
type Props = {
  counter: number,
  data: TrainingDataType,
}

const TrainingList = ({ ...props }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <React.Fragment>
      {/* list row */}
      <TableRow hover sx={{ '& > td': { borderBottom: '0px', cursor: 'pointer' } }} onClick={() => { setIsOpen(!isOpen) }}>
        <TableCell align="center">{props.counter}</TableCell>
        <TableCell align="left">{props.data.raw_text}</TableCell>
        <TableCell align="left">{props.data.best_category}</TableCell>
        <TableCell align="right" onClick={(e) => e.stopPropagation()}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" color="warning" onClick={() => setIsOpen(true)}>
              <Icon icon="bxs:edit" fontSize='18px' />
            </Button>
          </Box>
        </TableCell>
      </TableRow>

      {/* form edit row */}
      <TableRow sx={{ '& > td': { borderBottom: '1px solid rgba(0,0,0,0.1)' } }}>
        <TableCell style={{ paddingBottom: '0', paddingTop: 0 }} colSpan={8}>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <Box paddingBottom={3} paddingTop={3}>
              <TrainingForm
                data={props.data}
                handleCancleProp={() => { setIsOpen(false) }}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default TrainingList