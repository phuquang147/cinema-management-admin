// @mui
import { Alert, Card, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import LoginForm from "~/components/Login/LoginForm";
// import LoginForm from "~/components/Login/LoginForm";
import Logo from "~/components/Logo";
import useResponsive from "~/hooks/useResponsive";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

const Login: React.FC = () => {
  const mdUp = useResponsive("up", "md");
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("token")) {
      navigate(-1);
    }
  }, [navigate]);

  return (
    <RootStyle>
      <HeaderStyle>{/* <Logo /> */}</HeaderStyle>

      {mdUp && (
        <SectionStyle>
          <img src="/assets/images/login.png" alt="login" />
        </SectionStyle>
      )}

      <Container maxWidth="sm">
        <ContentStyle>
          {state && (
            <Alert
              severity="error"
              variant="outlined"
              sx={{ mb: 2, color: "#e57373" }}
            >
              {state.message}
            </Alert>
          )}
          <Typography variant="h4" gutterBottom>
            Đăng Nhập
          </Typography>

          <Typography sx={{ color: "text.secondary", mb: 5 }}>
            Nhập thông tin đăng nhập để tiếp tục
          </Typography>

          <LoginForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default Login;
