import { Box, Button, Collapse } from "@mui/material";
import { useEffect, useState } from "react";

/* Components */
import TrainingSingleForm from "./components/TrainingSingleForm";
import TrainingMultiForm from "./components/TrainingMultiForm";
import TrainingSingleResult from "./components/TrainingSingleResult";
import TrainingMultiResult from "./components/TrainingMultiResult";
/* Types */
import { ResultMultiType, ResultSingleType } from "./model/Types";
import { CategoryType } from "../Category/model/Types";
/* Functions */
import { GetCategoryList } from "../Category/model/Functions";

const Training = () => {
  const [showSingleForm, setShowSingleForm] = useState<boolean>(false);
  const [singleResult, setSingleResult] = useState<ResultSingleType>();
  const [showSingleResult, setShowSingleResult] = useState<boolean>(false);

  const openSingleForm = () => {
    setShowSingleForm(true)
    setShowMultiForm(false)
    setShowMultiResult(false)
  }

  const [showMultiForm, setShowMultiForm] = useState<boolean>(false);
  const [multiResult, setMultiResult] = useState<ResultMultiType>();
  const [showMultiResult, setShowMultiResult] = useState<boolean>(false);

  const openMultiForm = () => {
    setShowSingleForm(false)
    setShowMultiForm(true)
    setShowSingleResult(false)
  }

  /* Get Option Of Category  */
  const [optCategory, setOptCategory] = useState<CategoryType[]>([])

  const fetchCategory = async () => {
      const data = await GetCategoryList();
      setOptCategory(data)
  };

  useEffect(() => {
      fetchCategory();
  },[])

  return (
    <Box>
      {/* button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px', marginBottom: '20px', gap: 2 }}>
        <Button variant="outlined" color="info" onClick={() => openSingleForm()}>
          <Box sx={{ display: 'inline' }}>single</Box>
        </Button>
        <Button variant="outlined" color="warning" onClick={() => openMultiForm()}>
          <Box sx={{ display: 'inline' }}>multi</Box>
        </Button>
      </Box>

      {/* Form Single Train */}
      <Box>
        <Collapse in={showSingleForm === true} timeout="auto" unmountOnExit>
          <Box sx={{ paddingTop: 2, paddingBottom: 2, marginBottom: '38px' }}>
            <TrainingSingleForm
              handleCancleProp={() => { 
                setShowSingleForm(false) 
                setShowSingleResult(false)
              }}
              handleUpdateProp={(data) => {
                setSingleResult(data)
                setShowSingleResult(true)
                setShowMultiResult(false)
              }}
            />
          </Box>
        </Collapse>
      </Box>

      {/* Single Result */}
      <Box>
        <Collapse in={showSingleResult === true} timeout="auto" unmountOnExit>
          <Box sx={{ paddingTop: 2, paddingBottom: 2, marginBottom: '38px' }}>
            <TrainingSingleResult
              dataProp={singleResult}
              optCategoryProp={optCategory}
            />
          </Box>
        </Collapse>
      </Box>

      {/* Form Multi Train */}
      <Box>
        <Collapse in={showMultiForm === true} timeout="auto" unmountOnExit>
          <Box sx={{ paddingTop: 2, paddingBottom: 2, marginBottom: '38px' }}>
            <TrainingMultiForm
              handleCancleProp={() => { 
                setShowMultiForm(false) 
                setShowMultiResult(false)
              }}
              handleUpdateProp={(data) => {
                setMultiResult(data)
                setShowSingleResult(false)
                setShowMultiResult(true)
              }}
            />
          </Box>
        </Collapse>
      </Box>

      {/* Multi Result */}
      <Box>
        <Collapse in={showMultiResult === true} timeout="auto" unmountOnExit>
          <Box sx={{ paddingTop: 2, paddingBottom: 2, marginBottom: '38px' }}>
            <TrainingMultiResult
              dataProp={multiResult}
              optCategoryProp={optCategory}
            />
          </Box>
        </Collapse>
      </Box>
    </Box>
  )
}

export default Training;
