import { Autocomplete, TextField } from "@mui/material";
import React, { KeyboardEvent } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface RHFAutocompleteProps {
  name: string;
  options: Array<object> | Array<string>;
  label: string;
  getOptionLabel: (option: any) => string;
  isOptionEqualToValue: (option: any, value: any) => boolean;
  multiple?: boolean;
  disableClearable?: boolean;
  [x: string]: any;
}

const RHFAutocomplete: React.FC<RHFAutocompleteProps> = ({
  name,
  options,
  label,
  multiple = false,
  disableClearable = false,
  ...other
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Autocomplete
            {...field}
            value={
              field.value
                ? multiple
                  ? [...field.value]
                  : field.value
                : [options[0]]
            }
            options={options}
            fullWidth
            multiple={multiple}
            disableClearable={disableClearable}
            onChange={(e, value) => {
              field.onChange(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                value={field.value}
                error={!!error}
                helperText={error?.message}
                onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                  e.preventDefault();
                }}
              />
            )}
            {...other}
          />
        );
      }}
    />
  );
};

export default RHFAutocomplete;
