import { Card, Container, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ActorForm from "~/components/Actors/ActorForm";
import Iconify from "~/components/Iconify";
import AuthorizeContainer from "~/routes/AuthorizeContainer";

const EditActor: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AuthorizeContainer staffCanView={false}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="start"
          mb={5}
          gap={1}
        >
          <IconButton
            onClick={() => {
              navigate(-1);
            }}
          >
            <Iconify icon="ion:arrow-back" />
          </IconButton>
          <Typography variant="h4">Chỉnh sửa diễn viên</Typography>
        </Stack>

        <Card sx={{ padding: 4 }}>
          <ActorForm type="edit" />
        </Card>
      </Container>
    </AuthorizeContainer>
  );
};

export default EditActor;
