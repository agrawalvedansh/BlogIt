export const parseDate = dateString => {
  const date = new Date(dateString);

  const year = date.getUTCFullYear();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = date.getUTCMonth();
  const monthName = months[month];

  const day = date.getUTCDate();

  return { day, monthName, year };
};
