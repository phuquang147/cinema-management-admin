export const ISOToDateTime = (ISO: string) => {
  const date = new Date(ISO);
  return `${date.getHours()}:${date.getMinutes()} - ${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}
  `;
};
