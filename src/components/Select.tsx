import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import Iconify from "~/components/Iconify";

interface SelectProps {
  options: { value: string; label: string }[];
  selected: { label: string; value: string };
  setSelected: React.Dispatch<
    React.SetStateAction<{
      value: string;
      label: string;
    }>
  >;
  sx?: any;
}

const Select: React.FC<SelectProps> = ({
  options,
  selected,
  setSelected,
  sx = "",
}) => {
  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={
          <Iconify
            icon={open ? "eva:chevron-up-fill" : "eva:chevron-down-fill"}
          />
        }
        sx={sx ? sx : {}}
      >
        {selected.label}
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === selected.value}
            onClick={() => {
              if (option.value !== selected.value) setSelected(option);
              handleClose();
            }}
            sx={{ typography: "body2" }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Select;
