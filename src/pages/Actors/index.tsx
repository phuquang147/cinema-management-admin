import {
  Avatar,
  Button,
  Card,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { GridRowParams } from "@mui/x-data-grid";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ActionsMenu from "~/components/ActionsMenu";
import Iconify from "~/components/Iconify";
import Table from "~/components/Table";
import IActor from "~/interfaces/actor.interface";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { actorSagaActionTypes } from "~/redux/sagaActionTypes";
import AuthorizeContainer from "~/routes/AuthorizeContainer";

const columns = [
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    minWidth: 100,
    renderCell: (params: GridRowParams) => {
      const { row } = params;
      return (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt="" src={row.avatar} />
        </Stack>
      );
    },
  },
  {
    field: "name",
    headerName: "Tên diễn viên",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 200,
    renderCell: (params: GridRowParams) => {
      const { row } = params;
      return (
        <Typography variant="subtitle2" noWrap textAlign="start">
          {row.name}
        </Typography>
      );
    },
  },
  {
    field: "birthdate",
    headerName: "Ngày sinh",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 150,
    renderCell: (params: GridRowParams) => {
      const { row } = params;
      const birthday = new Date(row.birthday).toLocaleDateString();
      return <Typography>{birthday}</Typography>;
    },
  },
  {
    field: "nation",
    headerName: "Quốc tịch",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 150,
  },
  {
    field: "Hành động",
    headerName: "",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "right",
    sortable: false,
    hideable: false,
    filterable: false,
    minWidth: 180,
    flex: 1,
    renderCell: (params: GridRowParams) => {
      const { handleEdit, handleOpenDetail, handleDelete, ...actor } =
        params.row;

      return (
        <ActionsMenu
          item={actor}
          handleOpenDetail={handleOpenDetail}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      );
    },
  },
];

const Actors: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const actors = useAppSelector((state) => state.actor.actors);

  const handleEdit = (actor: IActor) => {
    navigate(`/dien-vien/${actor.slug}`, { state: { actor } });
  };

  const mappedRows = actors.map((actor: IActor) => ({
    ...actor,
    id: actor._id,
    handleEdit,
  }));

  useEffect(() => {
    dispatch({ type: actorSagaActionTypes.GET_ACTORS_SAGA });
  }, [dispatch]);

  return (
    <AuthorizeContainer staffCanView={false}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
          columnGap={2}
        >
          <Typography variant="h4">Diễn viên</Typography>
          <Button
            variant="contained"
            component={Link}
            to="/them-dien-vien"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Thêm diễn viên
          </Button>
        </Stack>

        <Card
          sx={{
            width: "100%",
            "& .super-app-theme--header": {
              fontWeight: "bold",
              color: "#222",
              fontSize: "16px",
            },
          }}
        >
          <Table rows={mappedRows} columns={columns} />
        </Card>
      </Container>
    </AuthorizeContainer>
  );
};

export default Actors;
