import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface RHFTextFieldProps {
  name: string;
  text?: string;
  label: string;
  type?: string;
  InputProps?: object;
}

const RHFTextField: React.FC<RHFTextFieldProps> = ({ name, ...other }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          value={field.value || other.text || ""}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
};

export default RHFTextField;
