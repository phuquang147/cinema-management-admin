import { Button, Card, Container, Stack, Typography } from "@mui/material";
import { GridRowParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import ActionsMenu from "~/components/ActionsMenu";
import Iconify from "~/components/Iconify";
import GenreForm from "~/components/Settings/GenreForm";
import Table from "~/components/Table";
import Modal from "~/HOC/Modal";
import IGenre from "~/interfaces/genre.interface";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { genreSagaActionTypes } from "~/redux/sagaActionTypes";
import AuthorizeContainer from "~/routes/AuthorizeContainer";

const columns = [
  {
    field: "name",
    headerName: "Tên thể loại phim",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 250,
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
      const { handleOpenDetail, handleEdit, handleDelete, ...genre } =
        params.row;

      return (
        <ActionsMenu
          item={genre}
          handleOpenDetail={handleOpenDetail}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      );
    },
  },
];

const Genres: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingGenre, setEditingGenre] = useState<IGenre | undefined>(
    undefined
  );
  const dispatch = useAppDispatch();
  const genres = useAppSelector((state) => state.genre.genres);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEdit = (genre: IGenre) => {
    setEditingGenre(genre);
    setShowModal(true);
  };

  const handleDelete = async (genreId: string) => {
    dispatch({
      type: genreSagaActionTypes.DELETE_GENRE_SAGA,
      payload: { id: genreId },
    });
  };

  const mappedRows = genres.map((genre) => ({
    ...genre,
    id: genre._id,
    handleEdit,
    handleDelete,
  }));

  useEffect(() => {
    dispatch({ type: genreSagaActionTypes.GET_GENRES_SAGA });
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
          <Typography variant="h4">Thể loại phim</Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleShowModal}
          >
            Thêm thể loại phim
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
        <Modal
          open={Boolean(showModal)}
          onClose={handleCloseModal}
          title={
            !editingGenre ? "Thêm thể loại phim" : "Chỉnh sửa thế loại phim"
          }
        >
          <GenreForm
            type={!editingGenre ? "new" : "edit"}
            genre={editingGenre}
            handleCloseModal={handleCloseModal}
          />
        </Modal>
      </Container>
    </AuthorizeContainer>
  );
};

export default Genres;
