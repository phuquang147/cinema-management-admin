import {
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { useEffect, useState } from "react";
import ShowTime from "~/components/Booking/ShowTime";
import IShowTime from "~/interfaces/showTime.interface";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import {
  getSnacks,
  resetData,
  selectShowTime,
} from "~/redux/reducers/BookingReducer";
import { getShowTimes } from "~/redux/reducers/ShowTimeReducer";
import {
  showTimeSagaActionTypes,
  transactionSagaActionTypes,
} from "~/redux/sagaActionTypes";
import { dateTimeToISO, getSevenDatesFromToday } from "~/utils/formatDateTime";

interface SelectShowTimeProps {
  handleNext: () => void;
}

export type MappedShowTime = {
  name: string;
  thumbnail: string;
  showTimes: IShowTime[];
};

const SelectShowTime: React.FC<SelectShowTimeProps> = ({ handleNext }) => {
  const dispatch = useAppDispatch();
  const sevenDatesFromToday = getSevenDatesFromToday();
  const [date, setDate] = useState<string>(sevenDatesFromToday[0].date);
  const [mappedShowTimes, setMappedShowTimes] = useState<MappedShowTime[]>([]);
  const { showTimes } = useAppSelector((state) => state.showTime);
  const { snacks } = useAppSelector((state) => state.snack);

  const handleChangeDate = (_: any, newDate: string) => {
    setDate(newDate);

    dispatch(getShowTimes([]));
    dispatch(resetData());

    dispatch({
      type: showTimeSagaActionTypes.GET_SHOW_TIMES_BY_DATE_SAGA,
      payload: {
        date: dateTimeToISO(
          new Date(
            `${new Date().getFullYear()}-${newDate.slice(3, 4)}-${newDate.slice(
              0,
              2
            )}`
          )
        ).slice(0, 10),
      },
    });
  };

  useEffect(() => {
    dispatch({ type: transactionSagaActionTypes.GET_DATA_FOR_TRANSACTION });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSnacks(snacks));
  }, [snacks, dispatch]);

  useEffect(() => {
    const grouppedShowTimesByMovie = _.groupBy(
      showTimes,
      (showTime) => showTime.movie.name
    );

    const mappedShowTimes = _.values(
      _.mapValues(grouppedShowTimesByMovie, (showTimesByMovie) => ({
        name: showTimesByMovie[0].movie.name,
        thumbnail: showTimesByMovie[0].movie.thumbnail,
        showTimes: showTimesByMovie,
      }))
    );

    setMappedShowTimes(mappedShowTimes);
  }, [showTimes]);

  const handleSelectShowTime = (showTime: IShowTime) => {
    dispatch(selectShowTime(showTime));
    handleNext();
  };

  return (
    <Stack>
      <ToggleButtonGroup
        color="primary"
        value={date}
        exclusive
        onChange={handleChangeDate}
      >
        {sevenDatesFromToday.map((date) => (
          <ToggleButton key={date.id} value={date.date} sx={{ px: 3 }}>
            <Stack>
              <Typography>{date.day}</Typography>
              <Typography>{date.date}</Typography>
            </Stack>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Grid container sx={{ mt: 4 }} spacing={2}>
        {mappedShowTimes.map((showTime) => (
          <Grid item xs={12} md={6} key={showTime.name}>
            <ShowTime
              showTime={showTime}
              handleSelectShowTime={handleSelectShowTime}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default SelectShowTime;
