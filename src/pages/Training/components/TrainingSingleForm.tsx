import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

/**
 * Components - global
 * ========================
 */
import { Box, Button, Card, Grid } from "@mui/material"
import { LoadingButton } from "@mui/lab";
import RHFTextField from "../../../components/hook-form/RHFTextField";
import FormProvider from "../../../components/hook-form/FormProvider";

/* Types */
import { ResultSingleType, TrainingSingleIType } from "../model/Types";
/* Functions */
import { TrainingSingleDefaultValues, TrainingSingleSchema } from "../model/ValidationSchema";
import { TrainSingle } from "../model/Function";

/* Props */
type Props = {
  data?: TrainingSingleIType,
  handleCancleProp: (showForm: boolean) => void,
  handleUpdateProp: (data: ResultSingleType) => void,
};

const TrainingForm = (props: Props) => {

  /* Form Config */
  const methods = useForm<TrainingSingleIType>({
    resolver: yupResolver(TrainingSingleSchema),
    defaultValues: TrainingSingleDefaultValues
  });

  const { reset, handleSubmit, formState: { isDirty, isSubmitting } } = methods;

  /* FIll Inputs */
  useEffect(() => {
    if (props.data !== undefined) {
      reset(props.data)
    }
  }, [])

  /* button submit */
  const submitHandler = async (data: TrainingSingleIType) => {
    if (data.raw_text != "") { // create
      const response = await TrainSingle(data)
      if (response != null) {
        props.handleUpdateProp && props.handleUpdateProp(response)
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