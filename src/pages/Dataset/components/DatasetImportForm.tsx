import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import Iconify from "../../../components/Iconify";

/**
 * Components - global
 * ========================
 */
import { Box, Button, ButtonBase, Card, Grid, Typography } from "@mui/material"
import { LoadingButton } from "@mui/lab";
import FormProvider from "../../../components/hook-form/FormProvider";

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

            const arr_file_dataset = formValues.file_dataset;
            arr_file_dataset.push(event.target.files[0]);

            setValue('file_dataset', arr_file_dataset)
        }
        else {
            console.log('NO FILE');
        }
    };

    /* button submit */
    const submitHandler = async (data: DatasetImportType) => {
        const response = await ImportDataset(data.file_dataset[0])
        if (response == true) {
            setIsDirty(false)
            setFileName('')
            props.handleImportProp()
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(submitHandler)}>
            <Card sx={{ p: 5 }} variant="outlined">
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <ButtonBase sx={{ p: 4, border: '2px dashed #F9FAFB',bgcolor: '#919EAB52',borderRadius: '8px',width: '100%', height: '60px'}} onClick={() => fileInput.current?.click()}>
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

export default DatasetImportForm