import { Box, Button, Collapse, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { Icon } from '@iconify/react';

/* Components */
import TrainingForm from "./components/TrainingForm";
// import TrainingImportForm from "./components/TrainingImportForm";
import TrainingList from "./components/TrainingList";
/* Types */
import { TrainingDataType } from "./model/Types";
import TrainingImportForm from "./components/TrainingImportForm";
/* Functions */

const Training = () => {
  const [showFormCreate, setShowFormCreate] = useState<boolean>(false);
  const [showFormImport, setShowFormImport] = useState<boolean>(false);
  const [trainingList, setTrainingList] = useState<TrainingDataType[]>([]);

  const openCreate = () => {
    setShowFormCreate(true)
    setShowFormImport(false)
  }

  const openImport = () => {
    setShowFormCreate(false)
    setShowFormImport(true)
  }

  return (
    <Box>
      {/* button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '38px', gap: 2 }}>
        <Button variant="outlined" color="info" onClick={() => openCreate()}>
          <Icon icon="typcn:plus" fontSize='18px' />
          <Box sx={{ display: 'inline', marginLeft: '12px' }}>Create</Box>
        </Button>
        <Button variant="outlined" color="warning" onClick={() => openImport()}>
          <Icon icon="material-symbols:upload" fontSize='18px' />
          <Box sx={{ display: 'inline', marginLeft: '12px' }}>Import</Box>
        </Button>
      </Box>

      {/* table */}
      <Table size='small' aria-label="simple table">

        <colgroup>
          <col width="100" />
          <col width="*" />
          <col width="200" />
          <col width="200" />
        </colgroup>

        <TableHead>
          <TableRow>
            <TableCell align="center">No</TableCell>
            <TableCell align="left">Raw</TableCell>
            <TableCell align="left">Predicted Category</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {/* Create New */}
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
              <Collapse in={showFormCreate === true} timeout="auto" unmountOnExit>
                <Box sx={{ paddingTop: 6, paddingBottom: 6 }}>
                  <TrainingForm
                    handleCancleProp={() => { setShowFormCreate(false) }}
                    handleUpdateProp={(data) => {
                      setTrainingList([...trainingList, data])
                    }}
                  />
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>

          {/* Import */}
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
              <Collapse in={showFormImport === true} timeout="auto" unmountOnExit>
                <Box sx={{ paddingTop: 6, paddingBottom: 6 }}>
                  <TrainingImportForm
                    handleCancleProp={() => { setShowFormImport(false) }}
                    handleImportProp={(data) => console.log(data)}
                  />
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>

          {/* List */}
          {trainingList.map((data: TrainingDataType, index) => {
            return (
              <TrainingList
                key={index}
                data={data}
                counter={index + 1}
              />
            );
          })}
        </TableBody>
      </Table>
    </Box>
  )
}

export default Training;
