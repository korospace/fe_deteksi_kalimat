import { Box, Collapse } from "@mui/material";
import { useState } from "react";

/* Components */
import TrainingSingleForm from "./components/TrainingSingleForm";
import TrainingSingleResult from "./components/TrainingSingleResult";
/* Types */
import { ResultSingleType } from "./model/Types";
/* Functions */

const Training = () => {
  const [singleResult, setSingleResult] = useState<ResultSingleType>();
  const [showSingleResult, setShowSingleResult] = useState<boolean>(false);

  return (
    <Box>
      {/* Form */}
      <Box>
        <Box sx={{ paddingTop: 2, paddingBottom: 2, marginBottom: '38px' }}>
          <TrainingSingleForm
            handleUpdateProp={(data) => {
              setSingleResult(data)
              setShowSingleResult(true)
            }}
          />
        </Box>
      </Box>

      {/* Single Result */}
      <Box>
        <Collapse in={showSingleResult === true} timeout="auto" unmountOnExit>
          <Box sx={{ paddingTop: 2, paddingBottom: 2, marginBottom: '38px' }}>
            <TrainingSingleResult
              dataProp={singleResult}
            />
          </Box>
        </Collapse>
      </Box>
    </Box>
  )
}

export default Training;
