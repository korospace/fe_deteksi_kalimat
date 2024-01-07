import { useEffect } from "react";
import { useForm } from "react-hook-form";

/**
 * Components - global
 * ========================
 */
import { Box, Button, Card, Grid } from "@mui/material"
import { LoadingButton } from "@mui/lab";
import RHFTextField from "../../../components/hook-form/RHFTextField";
import FormProvider from "../../../components/hook-form/FormProvider";

/* Types */
import { TrainingDataType } from "../model/Types";
import { TrainSingle } from "../model/Function";
/* Functions */
// import { DatasetSchema, DatasetDefaultValues } from "../model/ValidationSchema";
// import { CreateDataset, UpdateDataset } from "../model/Functions";

/* Props */
type Props = {
  data?: TrainingDataType,
  handleCancleProp: (showForm: boolean) => void,
  handleCreateProp?: () => void,
  handleUpdateProp?: (dataNew: TrainingDataType) => void,
};

const TrainingForm = (props: Props) => {

  /* Form Config */
  const methods = useForm<TrainingDataType>({
    // resolver: yupResolver(DatasetSchema),
    // defaultValues: DatasetDefaultValues
  });

  const { reset, handleSubmit, formState: { isDirty, isSubmitting } } = methods;

  /* FIll Inputs */
  useEffect(() => {
    if (props.data !== undefined) {
      reset(props.data)
    }
  }, [])

  /* button submit */
  const submitHandler = async (data: TrainingDataType) => {
    if (data.raw_text != "") { // create
      const response = await TrainSingle(data)
      if (response != null) {
        props.handleUpdateProp && props.handleUpdateProp(data)
        reset()
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(submitHandler)}>
      <Card sx={{ p: 5 }} variant="outlined">
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <RHFTextField name="raw_text" label="Kalimat" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent={'flex-end'}>
              <Box display="flex" gap={3}>
                <LoadingButton disabled={!isDirty} type="submit" variant="outlined" loading={isSubmitting}>
                  Submit
                </LoadingButton>
                <Button variant="outlined" color="inherit" onClick={() => props.handleCancleProp(false)}>Cancel</Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </FormProvider>
  );
}

export default TrainingForm