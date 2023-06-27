import {
  Autocomplete,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FC, KeyboardEvent, useState } from "react";
import Iconify from "~/components/Iconify";
import { useAppDispatch } from "~/redux/hooks";
import { reportSagaActionTypes } from "~/redux/sagaActionTypes";
import ReportByDate from "./ReportByDate";
import ReportByMonth from "./ReportByMonth";
import ReportByYear from "./ReportByYear";

const TIME_TYPES = [
  {
    value: "date",
    label: "Ngày",
  },
  {
    value: "month",
    label: "Tháng",
  },
  {
    value: "year",
    label: "Năm",
  },
];

const getInputFormat = (timeType: string) => {
  switch (timeType) {
    case "month":
      return "MM/YYYY";
    case "year":
      return "YYYY";
    default:
      return "DD/MM/YYYY";
  }
};

const getViews = (timeType: string) => {
  switch (timeType) {
    case "month":
      return ["month", "year"];
    case "year":
      return ["year"];
    default:
      return ["day", "month"] as any;
  }
};

const GeneralReport: FC = () => {
  const dispatch = useAppDispatch();
  const [time, setTime] = useState<Date | null>(new Date());
  const [view, setView] = useState<"list" | "chart">("list");
  const [timeType, setTimeType] = useState(TIME_TYPES[0]);

  const handleChangeView = (
    event: React.MouseEvent<HTMLElement>,
    newView: "list" | "chart"
  ) => {
    setView(newView);
  };

  const handleChangeTime = (value: any) => {
    setTime(value);

    switch (timeType.value) {
      case TIME_TYPES[0].value:
        dispatch({
          type: reportSagaActionTypes.GET_DAILY_REPORT_SAGA,
          payload: { date: value?.$d.toISOString() },
        });
        break;
      case TIME_TYPES[1].value:
        dispatch({
          type: reportSagaActionTypes.GET_MONTHLY_REPORT_SAGA,
          payload: {
            data: {
              month: value?.$d.getMonth(),
              year: value?.$d.getFullYear(),
            },
          },
        });
        break;
      default:
        dispatch({
          type: reportSagaActionTypes.GET_YEARLY_REPORT_SAGA,
          payload: { year: value?.$y },
        });
    }
  };

  return (
    <Stack>
      <Stack direction="row" gap={2}>
        <Autocomplete
          disablePortal
          options={TIME_TYPES}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Thời gian" />}
          disableClearable
          value={timeType}
          onChange={(_, value) => setTimeType(value)}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          size="small"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            inputFormat={getInputFormat(timeType.value)}
            views={getViews(timeType.value)}
            value={time}
            onChange={handleChangeTime}
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
      </Stack>
      <Stack direction="row" justifyContent="end" mb={2}>
        <ToggleButtonGroup value={view} exclusive onChange={handleChangeView}>
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
      {timeType.value === "date" && <ReportByDate view={view} />}
      {timeType.value === "month" && <ReportByMonth view={view} />}
      {timeType.value === "year" && <ReportByYear view={view} />}
    </Stack>
  );
};

export default GeneralReport;
