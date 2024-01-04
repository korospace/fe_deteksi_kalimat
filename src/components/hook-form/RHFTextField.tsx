// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { InputBaseComponentProps, TextField, TextFieldProps } from '@mui/material';

// ----------------------------------------------------------------------

interface IProps {
  name: string;
  alignText?: "right" | "left",
  startAdornment?: React.ReactNode,
  endAdornment?: React.ReactNode,
  inputComponent?: React.ElementType<InputBaseComponentProps>
}

export default function RHFTextField({ name, alignText, startAdornment, endAdornment, inputComponent, ...other }: IProps & TextFieldProps) {

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <TextField
            {...field}
            fullWidth
            autoComplete="off"
            error={!!error}
            helperText={error?.message}
            {...other}
            inputProps={{ min: 0, max: 5, style: { textAlign: alignText === "right" ? "right" : "left" } }}
            InputProps={{
              startAdornment,
              endAdornment,
              inputComponent: inputComponent as any,
            }}
          />
        </>
      )}
    />
  );
}
