import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";

/**
 * Components - global
 * ========================
 */
import { Box, Button, Card, Grid } from "@mui/material"
import { LoadingButton } from "@mui/lab";
import FormProvider from "../../../components/hook-form/FormProvider";
import { RHFUploadSingleFile } from "../../../components/hook-form/RHFUpload";

/* Types */
import { DatasetImportType } from "../model/Types";
/* Functions */
import { DatasetImportDefaultValues, DatasetImportSchema } from "../model/ValidationSchema";
import { ImportDataset } from "../model/Functions";

/* Props */
type Props = {
    handleCancleProp: (showForm: boolean) => void,
    handleImportProp: () => void,
};

const DatasetImportForm = (props: Props) => {    

    /* Form Config */
    const methods = useForm<DatasetImportType>({resolver: yupResolver(DatasetImportSchema),defaultValues: DatasetImportDefaultValues});

    const { reset, handleSubmit, setValue, formState: { isDirty, isSubmitting } } = methods;

    const handleDrop = useCallback(
        (acceptedFiles: any) => {
          const file = acceptedFiles[0];
    
          if (file) {
            setValue(
              'file_dataset',
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            );
          }
        },
        [setValue]
      );

    /* button submit */
    const submitHandler = async (data: DatasetImportType) => {
        const response = await ImportDataset(data)
        if (response == true) {
            reset()
            props.handleImportProp()
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(submitHandler)}>
            <Card sx={{ p: 5 }} variant="outlined">
                <Grid container spacing={5}>
                    <Grid item xs={6}>
                        <RHFUploadSingleFile
                            name="cover"
                            maxSize={3145728}
                            onDrop={handleDrop}
                        />
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

export default DatasetImportForm