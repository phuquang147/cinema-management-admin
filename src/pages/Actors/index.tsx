import {
  Avatar,
  Button,
  Card,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import ActionsMenu from "~/components/ActionsMenu";
import Iconify from "~/components/Iconify";
import Table from "~/components/Table";
import actors from "~/_mock/actors";

const columns = [
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    minWidth: 100,
    renderCell: (params: any) => {
      // const { row } = params;
      return (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt="" src="https://i.pravatar.cc/300" />
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
    renderCell: (params: any) => {
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
    renderCell: (params: any) => {
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
    renderCell: (params: any) => {
      const { name, birthday, id, handleOpenDetail, handleDelete } = params.row;

      const actor = {
        name,
        birthday,
        id,
      };

      return (
        <ActionsMenu
          item={actor}
          handleOpenDetail={handleOpenDetail}
          onDelete={handleDelete}
        />
      );
    },
  },
];

const Actors: React.FC = () => {
  const handleDelete = async (actorId: string) => {};

  const mappedRows = actors.map((actor) => ({
    ...actor,
    handleDelete,
  }));

  return (
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
  );
};

export default Actors;
