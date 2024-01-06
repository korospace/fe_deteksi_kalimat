import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

/**
 * Components - global
 * ========================
 */
import { Box, Button, Card, Grid, MenuItem, Select } from "@mui/material"
import { LoadingButton } from "@mui/lab";
import RHFTextField from "../../../components/hook-form/RHFTextField";
import FormProvider from "../../../components/hook-form/FormProvider";

/* Types */
import { UserType } from "../model/Types";
/* Functions */
import { UserSchema, UserDefaultValues } from "../model/ValidationSchema";
import { CreateUser, UpdateUser } from "../model/Functions";

/* Props */
type Props = {
    data?: UserType,
    handleCancleProp: (showForm: boolean) => void,
    handleCreateProp?: () => void,
    handleUpdateProp?: (dataNew: UserType) => void,
};

const UserForm = (props: Props) => {    

    /* Form Config */
    const methods = useForm<UserType>({resolver: yupResolver(UserSchema),defaultValues: UserDefaultValues});

    const { reset, handleSubmit, formState: { isDirty, isSubmitting } } = methods;

    /* FIll Inputs */
    useEffect(() => {
        if (props.data !== undefined) {
            reset(props.data)
        }
    },[])
  
    /* button submit */
    const submitHandler = async (data: UserType) => {
        if (data.id === 0 && props.handleCreateProp !== undefined) { // create
            const response = await CreateUser(data)
            if (response != null) {
                reset()
                props.handleCreateProp()
            }
        }
        else if (data !== null && props.handleUpdateProp !== undefined) { // update
            const response = await UpdateUser(data)
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
                        <RHFTextField name="email" label="Email" />
                    </Grid>
                    <Grid item xs={6}>
                        <RHFTextField name="password" label="New Password" type="password" />
                    </Grid>
                    <Grid item xs={6}>
                            <Select
                                name="user_access_id"
                                label="User Access"
                                sx={{ width: '100%' }}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
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

export default UserForm