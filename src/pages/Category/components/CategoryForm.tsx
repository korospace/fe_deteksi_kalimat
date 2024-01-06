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
import { CategoryType } from "../model/Types";
/* Functions */
import { CategorySchema, CategoryDefaultValues } from "../model/ValidationSchema";
import { CreateCategory, UpdateCategory } from "../model/Functions";

/* Props */
type Props = {
    data?: CategoryType,
    handleCancleProp: (showForm: boolean) => void,
    handleCreateProp?: () => void,
    handleUpdateProp?: (dataNew: CategoryType) => void,
};

const CategoryForm = (props: Props) => {    

    /* Form Config */
    const methods = useForm<CategoryType>({resolver: yupResolver(CategorySchema),defaultValues: CategoryDefaultValues});

    const { reset, handleSubmit, formState: { isDirty, isSubmitting } } = methods;

    /* FIll Inputs */
    useEffect(() => {
        if (props.data !== undefined) {
            reset(props.data)
        }
    },[])
  
    /* button submit */
    const submitHandler = async (data: CategoryType) => {
        if (data === null && props.handleCreateProp !== undefined) { // create
            const response = await CreateCategory(data)
            if (response != null) {
                reset()
                props.handleCreateProp()
            }
        }
        else if (data !== null && props.handleUpdateProp !== undefined) { // update
            const response = await UpdateCategory(data)
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
                        <RHFTextField name="name" label="Name" />
                    </Grid>
                    <Grid item xs={6}>
                        <RHFTextField name="description" label="Description" />
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

export default CategoryForm