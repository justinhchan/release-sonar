import queryString from "query-string";

export const getFormattedDate = (unformattedDate: string) => {
  const date = new Date(unformattedDate);
  const dateTimeFormat = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return dateTimeFormat.format(date);
};

export const getOffsetFromUrl = (url: string) => {
  const { offset } = queryString.parseUrl(url).query;
  return Number(offset);
};
