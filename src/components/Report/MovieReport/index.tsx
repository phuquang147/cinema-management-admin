import {
  Autocomplete,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FC, KeyboardEvent, useEffect, useState } from "react";
import Iconify from "~/components/Iconify";
import IMovie from "~/interfaces/movie.interface";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import {
  movieSagaActionTypes,
  reportSagaActionTypes,
} from "~/redux/sagaActionTypes";
import ReportAll from "./ReportAll";
import ReportByDate from "./ReportByDate";

const TIME_TYPES = [
  {
    value: "date",
    label: "Ngày",
  },
  {
    value: "all",
    label: "Tất cả",
  },
];

const MovieReport: FC = () => {
  const dispatch = useAppDispatch();
  const { movies } = useAppSelector((state) => state.movie);
  const [date, setDate] = useState<Date | null>(new Date());
  const [view, setView] = useState<"list" | "chart">("list");
  const [timeType, setTimeType] = useState(TIME_TYPES[0]);
  const [movie, setMovie] = useState<IMovie | null>(null);

  useEffect(() => {
    dispatch({ type: movieSagaActionTypes.GET_MOVIES_SAGA });
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      setMovie(movies[0]);
      dispatch({
        type: reportSagaActionTypes.GET_MOVIE_REPORT_BY_DATE_SAGA,
        payload: { movie: movies[0].slug, date: new Date().toISOString() },
      });
    }
  }, [movies]);

  const handleChangeView = (
    event: React.MouseEvent<HTMLElement>,
    newView: "list" | "chart"
  ) => {
    setView(newView);
  };

  const handleChangeMovie = (value: IMovie | null) => {
    setMovie(value);

    if (value) {
      if (timeType.value === "date") {
        dispatch({
          type: reportSagaActionTypes.GET_MOVIE_REPORT_BY_DATE_SAGA,
          payload: { movie: value.slug, date },
        });
      } else {
        dispatch({
          type: reportSagaActionTypes.GET_MOVIE_REPORT_SAGA,
          payload: { movie: value.slug },
        });
      }
    }
  };

  const handleChangeDate = (date: Date | null) => {
    setDate(date);
    dispatch({
      type: reportSagaActionTypes.GET_MOVIE_REPORT_BY_DATE_SAGA,
      payload: { movie: movie?.slug, date },
    });
  };

  const handleChangeTimeType = (
    _: any,
    value: { value: string; label: string }
  ) => {
    setTimeType(value);
    if (movie) {
      if (value.value === "date") {
        dispatch({
          type: reportSagaActionTypes.GET_MOVIE_REPORT_BY_DATE_SAGA,
          payload: { movie: movie.slug, date },
        });
      } else {
        dispatch({
          type: reportSagaActionTypes.GET_MOVIE_REPORT_SAGA,
          payload: { movie: movie.slug },
        });
      }
    }
  };

  return (
    <Stack gap={4}>
      <Stack direction="row" gap={2}>
        <Autocomplete
          disablePortal
          options={movies}
          sx={{ width: 300 }}
          getOptionLabel={(movie) => movie.name}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          renderInput={(params) => <TextField {...params} label="Phim" />}
          size="small"
          value={movie}
          onChange={(event: any, newValue: IMovie | null) => {
            handleChangeMovie(newValue);
          }}
        />
        <Autocomplete
          disablePortal
          options={TIME_TYPES}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Thời gian" />}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          disableClearable
          value={timeType}
          onChange={handleChangeTimeType}
          size="small"
        />
        {timeType.value === "date" && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              inputFormat="DD/MM/YYYY"
              value={date}
              onChange={handleChangeDate}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                    e.preventDefault();
                  }}
                  size="small"
                />
              )}
            />
          </LocalizationProvider>
        )}
      </Stack>

      {timeType.value === "date" && <ReportByDate />}
      {timeType.value === "all" && (
        <Stack gap={4}>
          <Stack direction="row" justifyContent="end">
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={handleChangeView}
            >
              <ToggleButton value="list">
                <Iconify
                  icon="fluent:list-24-regular"
                  sx={{ height: 24, width: 24 }}
                />
              </ToggleButton>
              <ToggleButton value="chart">
                <Iconify icon="ph:chart-line" sx={{ height: 24, width: 24 }} />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          <ReportAll view={view} />
        </Stack>
      )}
    </Stack>
  );
};

export default MovieReport;
