import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface RHFCheckboxProps {
  name: string;
  label: string;
}

const RHFCheckbox: React.FC<RHFCheckboxProps> = ({ name, label, ...other }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              value={field.value}
              checked={field.value}
              {...other}
            />
          }
          label={label}
          labelPlacement="start"
          sx={{ margin: 0 }}
        />
      )}
    />
  );
};

export default RHFCheckbox;
