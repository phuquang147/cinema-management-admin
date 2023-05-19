import { Container, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import * as React from "react";
import { useState } from "react";
import Payment from "~/components/Booking/Payment";
import SelectShowTime from "~/components/Booking/SelectShowTime";
import SelectSnack from "~/components/Booking/SelectSnack";
import SelectTicket from "~/components/Booking/SelectTicket";

const steps = ["Chọn suất chiếu", "Chọn ghế", "Chọn món", "Thanh toán"];

const Booking: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Container sx={{ pb: 8 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
        columnGap={2}
      >
        <Typography variant="h4">Đặt vé</Typography>
      </Stack>

      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: { optional?: React.ReactElement } = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <Stack
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="./assets/images/payment-success.png"
              alt=""
              style={{ marginTop: "50px" }}
            />
            <Typography sx={{ mt: 2, mb: 1, fontSize: 18 }}>
              Thanh toán thành công
            </Typography>
            <Button variant="contained" onClick={handleReset}>
              Đặt vé mới
            </Button>
          </Stack>
        ) : (
          <Box sx={{ mt: 3 }}>
            {activeStep === 0 && <SelectShowTime handleNext={handleNext} />}
            {activeStep === 1 && (
              <SelectTicket handleBack={handleBack} handleNext={handleNext} />
            )}
            {activeStep === 2 && (
              <SelectSnack handleBack={handleBack} handleNext={handleNext} />
            )}
            {activeStep === 3 && (
              <Payment handleBack={handleBack} handleNext={handleNext} />
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Booking;
