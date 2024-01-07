import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import FormProvider from "../../components/hook-form/FormProvider";
import RHFTextField from "../../components/hook-form/RHFTextField";
import { trainingSingleIForm } from "./model/Types";

import { trainSingle } from "./model/Function";

const Training = () => {
  const [singleData, setSingleData] = useState()

  const methods = useForm<trainingSingleIForm>()
  const { handleSubmit } = methods
  const submitHandler = (data: trainingSingleIForm) => {
    trainSingle(data)
  }

  return (
    <Fragment>
      <Card>
        <CardContent>
          <Stack gap={1}>
            <Typography variant="h6">Single Kalimat</Typography>
            <FormProvider methods={methods} onSubmit={handleSubmit(submitHandler)}>
              <RHFTextField name="trainingText" label="kalimat" />
            </FormProvider>
          </Stack>
        </CardContent>
      </Card>
    </Fragment>
  )
}

export default Training;
