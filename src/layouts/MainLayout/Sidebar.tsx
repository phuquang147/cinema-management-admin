import { Avatar, Box, Drawer, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Logo from "~/components/Logo";
import Scrollbar from "~/components/Scrollbar";
import useResponsive from "~/hooks/useResponsive";
import NavSection from "~/layouts/MainLayout/NavSection";
import { useAppSelector } from "~/redux/hooks";
import { managerNavConfig, staffNavConfig } from "./NavConfig";

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: theme.palette.grey[200],
  };
});

interface SidebarProps {
  isOpenSidebar: boolean;
  onCloseSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpenSidebar, onCloseSidebar }) => {
  const { pathname } = useLocation();
  const user = useAppSelector((state) => state.user.user);

  const isDesktop = useResponsive("up", "lg");

  let navConfigByRole =
    user?.role === "Chủ rạp" || user?.role === "Quản lý"
      ? managerNavConfig
      : staffNavConfig;

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src="" alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {user ? user.name : ""}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {user ? user.role : ""}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={navConfigByRole} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
};

export default Sidebar;
