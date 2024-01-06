import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

/**
 * Components - global
 * ========================
 */
import { Card, Grid, Typography } from "@mui/material"
import { LoadingButton } from "@mui/lab";
import RHFTextField from "../../../components/hook-form/RHFTextField";
import FormProvider from "../../../components/hook-form/FormProvider";

// Types
import { LoginReq } from "../model/Types";
// Validation Schema
import { LoginSchema, LoginDefaultValues } from "../model/ValidationSchema";
// Functions
import { Login } from "../model/Functions";

const LoginForm = () => {
    const methods = useForm<LoginReq>({
        resolver: yupResolver(LoginSchema),
        defaultValues: LoginDefaultValues,
    });

    const { reset, handleSubmit, formState: { isDirty, isSubmitting }} = methods;

    const onSubmit = async (data: LoginReq) => {
        const result = await Login(data);

        if (result == true) {
            window.location.reload();
        }

        reset()
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Card sx={{ padding: '24px', boxSizing: 'border-box', width: '100%', maxWidth: '400px' }}>
                <Grid container spacing={4}>
                    <Grid item sm={12}>
                        <Typography variant="h5" sx={{ color: 'rgba(0,0,0,0.8)', textAlign: 'center', marginBottom: '20px' }} >
                            Login Dashboard
                        </Typography>
                    </Grid>
                    <Grid item sm={12}>
                        <RHFTextField name="email" label="Email" />
                    </Grid>
                    <Grid item sm={12}>
                        <RHFTextField name="password" label="Password" type="password" />
                    </Grid>
                    <Grid item sm={12}>
                        <LoadingButton
                            sx={{ width: '100%', padding: '12px', marginTop: '28px' }}
                            disabled={!isDirty}
                            type="submit"
                            variant="outlined"
                            loading={isSubmitting}
                        >
                            login
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Card>
        </FormProvider>
    )
}

export default LoginForm