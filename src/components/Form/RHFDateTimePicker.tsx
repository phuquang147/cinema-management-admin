import { TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { KeyboardEvent } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface RHFDateTimePickerProps {
  name: string;
  label: string;
  [x: string]: any;
}

const RHFDateTimePicker: React.FC<RHFDateTimePickerProps> = ({
  name,
  ...other
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            {...field}
            value={field.value}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                  e.preventDefault();
                }}
              />
            )}
            {...other}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default RHFDateTimePicker;
