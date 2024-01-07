import { Box, Button, Collapse } from "@mui/material";
import { useState } from "react";

/* Components */
import TrainingSingleForm from "./components/TrainingSingleForm";
import TrainingMultiForm from "./components/TrainingMultiForm";
/* Types */
/* Functions */

const Training = () => {
  const [showFormCreate, setShowFormCreate] = useState<boolean>(false);
  const [showFormImport, setShowFormImport] = useState<boolean>(false);

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
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px', marginBottom: '20px', gap: 2 }}>
        <Button variant="outlined" color="info" onClick={() => openCreate()}>
          <Box sx={{ display: 'inline' }}>single</Box>
        </Button>
        <Button variant="outlined" color="warning" onClick={() => openImport()}>
          <Box sx={{ display: 'inline' }}>multi</Box>
        </Button>
      </Box>

      {/* Form Single Train */}
      <Box>
        <Collapse in={showFormCreate === true} timeout="auto" unmountOnExit>
          <Box sx={{ paddingTop: 2, paddingBottom: 2, marginBottom: '38px' }}>
            <TrainingSingleForm
              handleCancleProp={() => { setShowFormCreate(false) }}
              handleUpdateProp={(data) => {console.log(data)}}
            />
          </Box>
        </Collapse>
      </Box>

      {/* Form Bulk Train */}
      <Box>
        <Collapse in={showFormImport === true} timeout="auto" unmountOnExit>
          <Box sx={{ paddingTop: 2, paddingBottom: 2, marginBottom: '38px' }}>
            <TrainingMultiForm
              handleCancleProp={() => { setShowFormImport(false) }}
              handleImportProp={(data) => console.log(data)}
            />
          </Box>
        </Collapse>
      </Box>
    </Box>
  )
}

export default Training;
