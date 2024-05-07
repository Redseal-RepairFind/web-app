export const convertDate = ({
  isoDate,
  dateStyle,
}: {
  isoDate: string;
  dateStyle: "medium" | "long" | "full" | "short";
}) => {
  if (!isoDate) return null;

  let timestamp = Date.parse(isoDate);
  let jsDate = new Date(timestamp);
  let fDate = new Intl.DateTimeFormat("en-uk", {
    dateStyle: dateStyle || "long",
  });
  return fDate.format(jsDate);
};
