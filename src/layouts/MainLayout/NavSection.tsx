import { StyledComponent } from "@emotion/styled";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
} from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";
import { MUIStyledCommonProps } from "@mui/system";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
import {
  NavLink as RouterLink,
  NavLinkProps,
  useLocation,
} from "react-router-dom";
import Iconify from "~/components/Iconify";
import { INavConfig } from "./NavConfig";

const ListItemStyle: StyledComponent<
  {
    children: JSX.Element;
    component?: ForwardRefExoticComponent<
      NavLinkProps & RefAttributes<HTMLAnchorElement>
    >;
    to?: string;
    onClick?: () => void;
  } & MUIStyledCommonProps<Theme>,
  {},
  {}
> = styled(({ children, ...props }: { children: JSX.Element }) => (
  <ListItemButton disableGutters {...props}>
    {children}
  </ListItemButton>
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

function NavItem({
  item,
  active,
}: {
  item: INavConfig;
  active: (path: string | undefined) => boolean;
}) {
  const theme = useTheme();

  const isActiveRoot = active(item.path);

  const { title, path, icon, info, children } = item;

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    color: "primary.main",
    fontWeight: "fontWeightMedium",
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
  };

  const activeSubStyle = {
    color: "text.primary",
    fontWeight: "fontWeightMedium",
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <>
            <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
            <ListItemText disableTypography primary={title} />
            {info && info}
            <Iconify
              icon={
                open
                  ? "eva:arrow-ios-downward-fill"
                  : "eva:arrow-ios-forward-fill"
              }
              sx={{ width: 16, height: 16, ml: 1 }}
            />
          </>
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item: { path: string; title: string }) => {
              const { title, path } = item;
              const isActiveSub = active(path);

              return (
                <ListItemStyle
                  key={title}
                  component={RouterLink}
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <>
                    <ListItemIconStyle>
                      <Box
                        component="span"
                        sx={{
                          width: 4,
                          height: 4,
                          display: "flex",
                          borderRadius: "50%",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "text.disabled",
                          transition: (theme) =>
                            theme.transitions.create("transform"),
                          ...(isActiveSub && {
                            transform: "scale(2)",
                            bgcolor: "primary.main",
                          }),
                        }}
                      />
                    </ListItemIconStyle>
                    <ListItemText disableTypography primary={title} />
                  </>
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      <>
        <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
        <ListItemText disableTypography primary={title} />
        {info && info}
      </>
    </ListItemStyle>
  );
}

interface NavSectionProps {
  navConfig: INavConfig[];
}

const NavSection: React.FC<NavSectionProps> = ({ navConfig, ...other }) => {
  const { pathname } = useLocation();

  const match = (path: string | undefined) => {
    if (!path) return false;
    const pathFirstPart: string = path.split("/")[1];
    const pathnameFirstPart = pathname.split("/")[1];
    return pathFirstPart === pathnameFirstPart;
  };

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
};

export default NavSection;
