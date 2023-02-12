import {
  Avatar,
  Box,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import MenuPopover from "~/HOC/MenuPopover";
// import { useSelector } from "react-redux";
// import { selectUser } from '~/redux/dataSlice';

const MENU_OPTIONS = [
  {
    label: "Thông tin tài khoản",
    icon: "eva:person-fill",
    linkTo: "/profile",
  },
];

const AccountPopover: React.FC = () => {
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState<HTMLElement | null>(null);
  // const user = useSelector(selectUser);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget);

    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    handleClose();
    Cookies.remove("token");
    Cookies.remove("accountId");
    navigate("/login");
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open
            ? {
                "&:before": {
                  zIndex: 1,
                  content: "''",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  position: "absolute",
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                },
              }
            : {}),
        }}
      >
        <Avatar src="" alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          "& .MuiMenuItem-root": {
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {/* {user?.name} */}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {/* {user?.email} */}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              to={option.linkTo}
              component={RouterLink}
              // state={user}
              onClick={handleClose}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Đăng xuất
        </MenuItem>
      </MenuPopover>
    </>
  );
};

export default AccountPopover;
