import React, { useState } from "react";
import { Icon } from '@iconify/react';
import { Box, Button, Collapse, TableCell, TableRow } from "@mui/material";

/**
 * Components - global
 * ========================
 */

/* types */
import { CategoryType } from "../model/Types";
/* Components */
import CategoryForm from "./CategoryForm";
import CategoryDeleteDialog from "./CategoryDeleteDialog";

/* Props */
type Props = { 
  counter: number,
  data: CategoryType, 
  handleDeleteProp: (data: CategoryType) => void, 
  handleUpdateProp: (dataNew: CategoryType) => void 
}

const CategoryList = ({ ...props }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [openDelete, setOpenDelete] = useState<boolean>(false)

    return (
      <React.Fragment>
        {/* list row */}
        <TableRow hover sx={{ '& > td': { borderBottom: '0px', cursor: 'pointer' } }} onClick={() => {setIsOpen(!isOpen)}}>
          <TableCell align="center">{props.counter}</TableCell>
          <TableCell align="left">{props.data.name}</TableCell>
          <TableCell align="left">{props.data.description}</TableCell>
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
          <TableCell style={{ paddingBottom: '0', paddingTop: 0 }} colSpan={7}>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <Box paddingBottom={3} paddingTop={3}> 
                  <CategoryForm
                      data={props.data}
                      handleCancleProp={() => {setIsOpen(false)}} 
                      handleUpdateProp={(dataNew) => props.handleUpdateProp(dataNew)} 
                  />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>

        {/* Delete */}
        <CategoryDeleteDialog 
          data={props.data} 
          openDialog={openDelete} 
          closeDialog={() => setOpenDelete(false)}
          handleDeleteProp={() => props.handleDeleteProp(props.data)} 
        />
      </React.Fragment>
    );
}

export default CategoryList