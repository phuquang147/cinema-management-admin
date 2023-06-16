import {
  Button,
  Card,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import _ from "lodash";
import { KeyboardEvent, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Modal from "~/HOC/Modal";
import Iconify from "~/components/Iconify";
import ShowTimeForm from "~/components/ShowTimes/ShowTimeForm";
import IShowTime from "~/interfaces/showTime.interface";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { showTimeSagaActionTypes } from "~/redux/sagaActionTypes";
import AuthorizeContainer from "~/routes/AuthorizeContainer";

type MappedShowTime = {
  name: string;
  data: {
    x: string;
    y: number[];
    data: IShowTime;
  }[];
};

const ShowTimes: React.FC = () => {
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<Date | null>(new Date());
  const { showTimes } = useAppSelector((state) => state.showTime);
  const [mappedShowTimes, setMappedShowTimes] = useState<MappedShowTime[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingShowTime, setEditingShowTime] = useState<IShowTime | undefined>(
    undefined
  );
  const [chartHeight, setChartHeight] = useState<number>(50);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingShowTime(undefined);
  };

  const handleEdit = (showTime: IShowTime) => {
    setEditingShowTime(showTime);
    setShowModal(true);
  };

  useEffect(() => {
    dispatch({
      type: showTimeSagaActionTypes.GET_SHOW_TIMES_BY_DATE_SAGA,
      payload: {
        date: new Date().toISOString().slice(0, 10),
      },
    });
  }, [dispatch]);

  useEffect(() => {
    const grouppedShowTimesByMovie = _.groupBy(
      showTimes,
      (showTime) => showTime.movie.name
    );

    const grouppedShowTimesByRoom = _.groupBy(
      showTimes,
      (showTime) => showTime.room.name
    );

    const mappedShowTimes = _.values(
      _.mapValues(grouppedShowTimesByMovie, (showTimesByMovie) => ({
        name: showTimesByMovie[0].movie.name,
        data: _.map(showTimesByMovie, (showTime) => ({
          x: showTime.room.name,
          y: [
            new Date(showTime.startTime).getTime(),
            new Date(showTime.endTime).getTime(),
          ],
          data: showTime,
        })),
      }))
    );

    setMappedShowTimes(mappedShowTimes);

    const movieCount = Object.keys(grouppedShowTimesByMovie).length;
    const roomCount = Object.keys(grouppedShowTimesByRoom).length;
    setChartHeight(
      movieCount > 0 && roomCount > 0 ? movieCount * roomCount * 50 + 50 : 200
    );
  }, [showTimes]);

  const options: ApexCharts.ApexOptions = {
    chart: {
      height: 550,
      type: "rangeBar",
      zoom: {
        enabled: true,
        type: "x",
      },
      events: {
        dataPointSelection: function (event, chartContext, config) {
          handleEdit(
            config.w.config.series[config.seriesIndex].data[
              config.dataPointIndex
            ].data
          );
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      style: {
        colors: ["#fff"],
      },
      offsetX: 0,
      dropShadow: {
        enabled: true,
      },
      formatter: function (val: any, opt) {
        const startTime = new Date(val[0]);
        const endTime = new Date(val[1]);
        startTime.setHours(startTime.getHours() - 7);
        endTime.setHours(endTime.getHours() - 7);

        if (startTime.getDate() !== endTime.getDate())
          return `${dayjs(startTime).format("hh:mm a D/M/YYYY")}`;
        return `${dayjs(startTime).format("HH:mm")} - ${dayjs(endTime).format(
          "HH:mm"
        )} (${dayjs(startTime).format("DD/MM/YYYY")})`;
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeFormatter: {
          year: "yyyy",
          month: "dd/MM/yyyy",
          day: "dd/MM",
          hour: `HH:mm dd/MM`,
          minute: "HH:mm",
        },
      },
    },
    tooltip: {
      enabled: false,
    },
  };

  const handleChangeDate = (date: Date | null) => {
    if (dayjs(date).isValid()) {
      setDate(date);
      dispatch({
        type: showTimeSagaActionTypes.GET_SHOW_TIMES_BY_DATE_SAGA,
        payload: {
          date: date?.toISOString().slice(0, 10),
        },
      });
    }
  };

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
          <Typography variant="h4">Lịch chiếu</Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleShowModal}
          >
            Thêm lịch chiếu
          </Button>
        </Stack>

        <Card sx={{ p: 3 }}>
          <Grid container>
            <Grid item xs={12} md={6} lg={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Ngày"
                  value={date}
                  inputFormat="DD/MM/YYYY"
                  onChange={handleChangeDate}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{ width: "100%" }}
                      onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                        e.preventDefault();
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Card>

        <Card
          sx={{
            width: "100%",
            mt: 2,
            p: 2,
          }}
        >
          <ReactApexChart
            options={options}
            series={mappedShowTimes}
            type="rangeBar"
            height={chartHeight}
          />
        </Card>
        <Modal
          open={showModal}
          onClose={handleCloseModal}
          title={!editingShowTime ? "Thêm lịch chiếu" : "Chỉnh sửa lịch chiếu"}
        >
          <ShowTimeForm
            type={!editingShowTime ? "new" : "edit"}
            showTime={editingShowTime}
            handleCloseModal={handleCloseModal}
          />
        </Modal>
      </Container>
    </AuthorizeContainer>
  );
};

export default ShowTimes;
