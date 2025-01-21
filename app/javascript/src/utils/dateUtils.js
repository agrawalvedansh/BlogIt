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

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  const time = `${hours}:${minutes} ${ampm}`;

  return { day, monthName, year, time };
};
