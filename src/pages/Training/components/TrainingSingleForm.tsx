import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

/**
 * Components - global
 * ========================
 */
import { Box, Card, Grid } from "@mui/material"
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
  handleUpdateProp: (data: ResultSingleType) => void,
};

const TrainingSingleForm = (props: Props) => {

  /* Form Config */
  const methods = useForm<TrainingSingleIType>({
    resolver: yupResolver(TrainingSingleSchema),
    defaultValues: TrainingSingleDefaultValues
  });

  const { handleSubmit, formState: { isDirty, isSubmitting } } = methods;

  /* button submit */
  const submitHandler = async (data: TrainingSingleIType) => {
    const response = await TrainSingle(data)
    if (response != null) {
      props.handleUpdateProp(response)
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(submitHandler)}>
      <Card sx={{ p: 5 }} variant="outlined">
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <RHFTextField name="text" label="Kalimat" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent={'flex-end'}>
              <Box display="flex" gap={3}>
                <LoadingButton disabled={!isDirty} type="submit" variant="outlined" loading={isSubmitting}>
                  Submit
                </LoadingButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </FormProvider>
  );
}

export default TrainingSingleForm