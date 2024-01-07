import React, { useState } from "react";
import { Icon } from '@iconify/react';
import { Box, Button, Collapse, TableCell, TableRow } from "@mui/material";

/**
 * Components - global
 * ========================
 */

/* types */
import { DatasetType } from "../model/Types";
/* Components */
import DatasetForm from "./DatasetForm";
import DatasetDeleteDialog from "./DatasetDeleteDialog";

/* Props */
type Props = { 
  counter: number,
  data: DatasetType, 
  handleDeleteProp: (data: DatasetType) => void, 
  handleUpdateProp: (dataNew: DatasetType) => void 
}

const DatasetList = ({ ...props }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [openDelete, setOpenDelete] = useState<boolean>(false)

    return (
      <React.Fragment>
        {/* list row */}
        <TableRow hover sx={{ '& > td': { borderBottom: '0px', cursor: 'pointer' } }} onClick={() => {setIsOpen(!isOpen)}}>
          <TableCell align="center">{props.counter}</TableCell>
          <TableCell align="left">{props.data.raw}</TableCell>
          <TableCell align="left">{props.data.clean}</TableCell>
          <TableCell align="left">{props.data.stemming}</TableCell>
          <TableCell align="left">{props.data.stopword}</TableCell>
          <TableCell align="left">{props.data.tokenization}</TableCell>
          <TableCell align="center">{props.data.category}</TableCell>
          <TableCell align="right" onClick={(e) => e.stopPropagation()}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="outlined" color="warning" onClick={() => setIsOpen(true)}>
                <Icon icon="bxs:edit" fontSize='18px' />
              </Button>
              <Button variant="outlined" color="error" onClick={() => setOpenDelete(true)}>
                <Icon icon="ant-design:delete-filled" fontSize='18px' />
              </Button>
            </Box>
          </TableCell>
        </TableRow>
  
        {/* form edit row */}
        <TableRow sx={{ '& > td': { borderBottom: '1px solid rgba(0,0,0,0.1)' } }}>
          <TableCell style={{ paddingBottom: '0', paddingTop: 0 }} colSpan={8}>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <Box paddingBottom={3} paddingTop={3}> 
                  <DatasetForm
                      data={props.data}
                      handleCancleProp={() => {setIsOpen(false)}} 
                      handleUpdateProp={(dataNew) => props.handleUpdateProp(dataNew)} 
                  />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>

        {/* Delete */}
        <DatasetDeleteDialog 
          data={props.data} 
          openDialog={openDelete} 
          closeDialog={() => setOpenDelete(false)}
          handleDeleteProp={() => props.handleDeleteProp(props.data)} 
        />
      </React.Fragment>
    );
}

export default DatasetList