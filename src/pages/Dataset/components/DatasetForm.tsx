import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

/**
 * Components - global
 * ========================
 */
import { Box, Button, Card, Grid, MenuItem } from "@mui/material"
import { LoadingButton } from "@mui/lab";
import RHFTextField from "../../../components/hook-form/RHFTextField";
import RHFSelect from "../../../components/hook-form/RHFSelect";
import FormProvider from "../../../components/hook-form/FormProvider";

/* Types */
import { DatasetType } from "../model/Types";
import { CategoryType } from "../../Category/model/Types";
/* Functions */
import { DatasetSchema, DatasetDefaultValues } from "../model/ValidationSchema";
import { CreateDataset, UpdateDataset } from "../model/Functions";
import { GetCategoryList } from "../../Category/model/Functions";

/* Props */
type Props = {
    data?: DatasetType,
    handleCancleProp: (showForm: boolean) => void,
    handleCreateProp?: () => void,
    handleUpdateProp?: (dataNew: DatasetType) => void,
};

const DatasetForm = (props: Props) => {    

    /* Form Config */
    const methods = useForm<DatasetType>({resolver: yupResolver(DatasetSchema),defaultValues: DatasetDefaultValues});

    const { reset, handleSubmit, formState: { isDirty, isSubmitting } } = methods;

    /* Get Option Of Category  */
    const [optCategory, setOptCategory] = useState<CategoryType[]>([])

    const fetchCategory = async () => {
        const data = await GetCategoryList();
        setOptCategory(data)
    };

    useEffect(() => {
        fetchCategory();
    },[])

    /* FIll Inputs */
    useEffect(() => {
        if (props.data !== undefined) {
            reset(props.data)
        }
    },[])
  
    /* button submit */
    const submitHandler = async (data: DatasetType) => {
        if (data.id === 0 && props.handleCreateProp !== undefined) { // create
            const response = await CreateDataset(data)
            if (response != null) {
                reset()
                props.handleCreateProp()
            }
        }
        else if (data !== null && props.handleUpdateProp !== undefined) { // update
            const response = await UpdateDataset(data)
            if (response != null) {
                props.handleUpdateProp(response)
            }
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(submitHandler)}>
            <Card sx={{ p: 5 }} variant="outlined">
                <Grid container spacing={5}>
                    <Grid item xs={6}>
                        <RHFTextField name="raw" label="raw" />
                    </Grid>
                    <Grid item xs={6} sx={{ display: props.data !== undefined ? 'inherit' : 'none' }}>
                        <RHFTextField name="clean" label="Clean" />
                    </Grid>
                    <Grid item xs={6} sx={{ display: props.data !== undefined ? 'inherit' : 'none' }}>
                        <RHFTextField name="stopword" label="stopword" />
                    </Grid>
                    <Grid item xs={6} sx={{ display: props.data !== undefined ? 'inherit' : 'none' }}>
                        <RHFTextField name="stemming" label="stemming" />
                    </Grid>
                    <Grid item xs={6} sx={{ display: props.data !== undefined ? 'inherit' : 'none' }}>
                        <RHFTextField name="tokenization" label="Tokenization" />
                    </Grid>
                    <Grid item xs={6}>
                        <RHFSelect
                            name="category"
                            label="category"
                            InputLabelProps={{ shrink: true }}
                            SelectProps={{ native: false }}
                            >
                            <MenuItem value={0} selected>{"- pilih -"}</MenuItem>
                            {
                                optCategory.map((el : CategoryType, index: any) => (
                                    <MenuItem key={index} value={el.name}>{el.name}</MenuItem>
                                ))
                            }
                        </RHFSelect>
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

export default DatasetForm