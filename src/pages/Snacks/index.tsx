import {
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Iconify from "~/components/Iconify";
import Snack from "~/components/Snacks/Snack";
import useDebounce from "~/hooks/useDebounce";
import ISnack from "~/interfaces/snack.interface";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { snackSagaActionTypes } from "~/redux/sagaActionTypes";
import AuthorizeContainer from "~/routes/AuthorizeContainer";

const Snacks: React.FC = () => {
  const dispatch = useAppDispatch();
  const snacks = useAppSelector((state) => state.snack.snacks);
  const [searchValue, setSearchValue] = useState<string>("");
  const [loadedSnacks, setLoadedSnacks] = useState<ISnack[]>([]);

  useEffect(() => {
    dispatch({ type: snackSagaActionTypes.GET_SNACKS_SAGA });
  }, [dispatch]);

  useEffect(() => {
    setLoadedSnacks(snacks);
  }, [snacks]);

  const debouncedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedValue.trim().length === 0) {
      setLoadedSnacks(snacks);
    }

    if (debouncedValue !== "") {
      const relevantSnacks = snacks.filter((item) =>
        item.name.toLowerCase().includes(debouncedValue.toLowerCase())
      );
      setLoadedSnacks(relevantSnacks);
    }
  }, [debouncedValue, snacks]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchInputValue = e.target.value;
    if (!searchInputValue.startsWith(" ")) {
      setSearchValue(searchInputValue);
    }
  };

  return (
    <AuthorizeContainer staffCanView={false}>
      <Container sx={{ pb: 8 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
          columnGap={2}
        >
          <Typography variant="h4">Đồ ăn nhẹ</Typography>
          <Stack direction="row" columnGap={2}>
            <TextField
              variant="outlined"
              placeholder="Tìm kiếm"
              value={searchValue}
              onChange={handleInputChange}
              size="small"
            />
            <Button
              variant="contained"
              component={Link}
              to="/them-do-an-nhe"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Thêm món
            </Button>
          </Stack>
        </Stack>
        <Grid container spacing={3}>
          {loadedSnacks.map((snack) => (
            <Grid item key={snack._id} xs={6} sm={4} md={3}>
              <Snack snack={snack} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </AuthorizeContainer>
  );
};

export default Snacks;
