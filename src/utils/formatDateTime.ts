export const ISOToDateTimeFormat = (ISO: string) => {
  const date = new Date(ISO);
  return `${date.getHours()}:${date.getMinutes()} - ${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}
  `;
};

export const dateTimeToISO = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + 7);

  return newDate.toISOString();
};

export const isoToDateTime = (isoDate: string) => {
  const newDate = new Date(isoDate);
  newDate.setHours(newDate.getHours() - 7);

  return newDate;
};
