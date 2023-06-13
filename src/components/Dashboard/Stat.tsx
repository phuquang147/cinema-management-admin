import { Box, Card, Typography, useTheme } from "@mui/material";
import Iconify from "../Iconify";

type StatProps = {
  title: string;
  icon: string;
  value: string;
};

const Stat: React.FC<StatProps> = ({ title, icon, value }) => {
  const theme = useTheme();
  return (
    <Card sx={{ padding: 3 }}>
      <Typography>{title}</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 1,
        }}
      >
        <Typography variant="h5">{value}</Typography>
        <Iconify
          icon={icon}
          sx={{
            height: "40px",
            width: "40px",
            color: theme.palette.primary.main,
          }}
        />
      </Box>
    </Card>
  );
};

export default Stat;
