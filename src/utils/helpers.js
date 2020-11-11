export const getObject = (key) => JSON.parse(localStorage.getItem(key));
export const setObject = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

export const { format } = Intl.DateTimeFormat("tr", {
  year: "numeric",
  day: "numeric",
  month: "long",
});

export const readableDate = (dateString) => {
  try {
    return format(Date.parse(dateString));
  } catch {
    return format(new Date());
  }
};
