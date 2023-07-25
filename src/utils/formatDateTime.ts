export const ISOToDateTimeFormat = (ISO: string) => {
  const date = new Date(ISO);
  return `${date.getHours()}:${date.getMinutes()} - ${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}
  `;
};

export const dateTimeToISO = (date: Date) => {
  return date.toISOString();
};

export const isoToDateTime = (isoDate: string) => {
  const newDate = new Date(isoDate);
  newDate.setHours(newDate.getHours() - 7);

  return newDate;
};

export const getSevenDatesFromToday = () => {
  const dates = [];
  const date = new Date();

  for (let i = 0; i < 7; i++) {
    dates.push({
      id: date.getTime().toString(),
      day: date.getDay() > 0 ? `Thứ ${date.getDay() + 1}` : "CN",
      date: `${date.getDate()}/${date.getMonth() + 1}`,
    });

    date.setDate(date.getDate() + 1);
  }

  return dates;
};
