import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import Iconify from "../../../components/Iconify";
import { yupResolver } from "@hookform/resolvers/yup";

/**
 * Components - global
 * ========================
 */
import { Box, Button, ButtonBase, Card, Grid, Typography } from "@mui/material"
import { LoadingButton } from "@mui/lab";
import FormProvider from "../../../components/hook-form/FormProvider";

/* Types */
import { TrainingMultiType } from "../model/Types";
/* Functions */
import { TrainingMulti } from "../model/Function";
import { TrainingMultiDefaultValues, TrainingMultiSchema } from "../model/ValidationSchema";


/* Props */
type Props = {
  handleCancleProp: (showForm: boolean) => void,
  handleUpdateProp: (data: any) => void,
};

const TrainingMultiForm = (props: Props) => {

  /* Form Config */
  const methods = useForm<TrainingMultiType>({
    resolver: yupResolver(TrainingMultiSchema),
    defaultValues: TrainingMultiDefaultValues
  });
  const { watch, handleSubmit, setValue, formState: { isSubmitting } } = methods;
  const formValues = watch();

  /* input file */
  const fileInput = useRef<HTMLInputElement>(null);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');

  const handleInputChange = (event: any) => {
    if (event.target.files[0]) {
      setIsDirty(true)
      setFileName(event.target.files[0].name)
      const arr_file_training = formValues.file_bulktraining;
      console.log(formValues)
      arr_file_training.push(event.target.files[0]);

      setValue('file_bulktraining', arr_file_training)
    }
    else {
      console.log('NO FILE');
    }
  };

  /* button submit */
  const submitHandler = async (data: TrainingMultiType) => {
    const response = await TrainingMulti(data.file_bulktraining[0])
    if (response != null) {
      setIsDirty(false)
      setFileName('')
      props.handleUpdateProp(response)
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(submitHandler)}>
      <Card sx={{ p: 5 }} variant="outlined">
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <ButtonBase sx={{ p: 4, border: '2px dashed #F9FAFB', bgcolor: '#919EAB52', borderRadius: '8px', width: '100%', height: '60px' }} onClick={() => fileInput.current?.click()}>
              <Box
                sx={{
                  display: 'flex',
                  placeItems: 'center',
                  gap: 1,
                  placeContent: 'center',
                }}
              >
                <Iconify icon="icon-park-outline:upload-one" fontSize="3em" />
                <Typography variant="body1" fontWeight="bold">
                  {fileName}
                </Typography>
              </Box>
              <input
                type="file"
                id="file"
                ref={fileInput}
                style={{ display: 'none' }}
                multiple
                onChange={handleInputChange}
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              />
            </ButtonBase>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" justifyContent={'flex-end'}>
              <Box display="flex" gap={3}>
                <LoadingButton disabled={!isDirty} type="submit" variant="outlined" loading={isSubmitting}>
                  Save Changes
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

export default TrainingMultiForm