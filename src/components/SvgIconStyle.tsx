import { Box } from "@mui/material";

interface SvgIconStyleProps {
  src: string;
  sx?: object;
}

const SvgIconStyle: React.FC<SvgIconStyleProps> = ({ src, sx }) => {
  return (
    <Box
      component="span"
      sx={{
        width: 24,
        height: 24,
        display: "inline-block",
        bgcolor: "currentColor",
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
    />
  );
};

export default SvgIconStyle;
