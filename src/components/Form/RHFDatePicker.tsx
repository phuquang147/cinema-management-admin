import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Controller, useFormContext } from "react-hook-form";

interface RHFDatePickerProps {
  name: string;
  label: string;
}

const RHFDatePicker: React.FC<RHFDatePickerProps> = ({ name, ...other }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            {...field}
            inputFormat="DD/MM/YYYY"
            value={field.value}
            renderInput={(params) => <TextField {...params} fullWidth />}
            {...other}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default RHFDatePicker;
