import { Box, Button, Container, Typography } from "@mui/material";
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "~/redux/hooks";

type AuthorizeContainerProps = {
  children: ReactNode;
  ownerCanView?: boolean;
  managerCanView?: boolean;
  staffCanView?: boolean;
};

const AuthorizeContainer: FC<AuthorizeContainerProps> = ({
  children,
  ownerCanView = true,
  managerCanView = true,
  staffCanView = true,
}) => {
  const { user } = useAppSelector((state) => state.user);

  return (user?.role === "Chủ rạp" && ownerCanView) ||
    (user?.role === "Quản lý" && managerCanView) ||
    (user?.role === "Nhân viên" && staffCanView) ? (
    <div>{children}</div>
  ) : (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" paragraph>
          Bạn không có quyền truy cập chức năng này
        </Typography>

        <Box
          component="img"
          src="/assets/images/restriction.png"
          sx={{ height: 240, mx: "auto", my: { xs: 2, sm: 4 } }}
          draggable={false}
        />

        <Button to="/" size="large" variant="contained" component={Link}>
          Về trang chủ
        </Button>
      </Box>
    </Container>
  );
};

export default AuthorizeContainer;
