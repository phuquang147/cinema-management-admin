import { Icon } from "@iconify/react";
import { Box } from "@mui/material";

interface IconifyProps {
  icon: string;
  sx?: Object;
}

const Iconify: React.FC<IconifyProps> = ({ icon, sx }) => {
  return <Box component={Icon} icon={icon} sx={sx ? sx : {}} />;
};

export default Iconify;
