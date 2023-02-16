import { Typography } from "@mui/material";

interface CustomErrorTextProps {
  errorText: string;
}

const CustomErrorText: React.FC<CustomErrorTextProps> = ({ errorText }) => {
  return (
    <Typography sx={{ fontSize: 12, ml: "16px", mt: "4px", color: "red" }}>
      {errorText}
    </Typography>
  );
};

export default CustomErrorText;
