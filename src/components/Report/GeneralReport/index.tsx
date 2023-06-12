import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FC, KeyboardEvent, useState } from "react";
import Iconify from "~/components/Iconify";
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

const GeneralReport: FC = () => {
  const [time, setTime] = useState<Date | null>(new Date());
  const [view, setView] = useState<"list" | "chart">("list");
  const [timeType, setTimeType] = useState(TIME_TYPES[0]);

  const handleChangeView = (
    event: React.MouseEvent<HTMLElement>,
    newView: "list" | "chart"
  ) => {
    setView(newView);
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
          size="small"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            inputFormat="DD/MM/YYYY"
            value={time}
            onChange={(value) => {
              setTime(value);
            }}
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
        <Button variant="contained">
          <Iconify icon="file-icons:microsoft-excel" sx={{ mr: 1 }} />
          Xuất Excel
        </Button>
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
