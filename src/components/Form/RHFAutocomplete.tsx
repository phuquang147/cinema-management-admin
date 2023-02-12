import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface RHFAutocompleteProps {
  name: string;
  options: Array<object>;
  label: string;
  other: any[];
}

const RHFAutocomplete: React.FC<RHFAutocompleteProps> = ({
  name,
  options,
  label,
  ...other
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Autocomplete
            {...field}
            value={field.value || options[0]}
            options={options}
            fullWidth
            disableClearable={true}
            onChange={(e, value) => {
              field.onChange(value);
            }}
            renderInput={(params) => (
              <TextField {...params} label={label} value={field.value} />
            )}
            {...other}
          />
        );
      }}
    />
  );
};

export default RHFAutocomplete;
