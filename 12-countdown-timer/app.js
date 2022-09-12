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
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

const futureDate = new Date(2022, 8, 1, 12, 0, 0);
const date = futureDate.getDate();
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const mins = futureDate.getMinutes();
const month = months[futureDate.getMonth()];
const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `Giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${mins}am`;
// get milisconds

const futureTime = futureDate.getTime();

function getRemainingTime() {
  const today = new Date().getTime();
  let t = futureTime - today;

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;

  const days = Math.floor(t / oneDay);
  const hours = Math.floor((t % oneDay) / oneHour);
  const mins = Math.floor((t % oneHour) / oneMin);
  const secs = Math.floor((t % oneMin) / 1000);

  const time = [days, hours, mins, secs];

  function format(time) {
    if (time < 10) {
      return `0${time}`;
    }
    return time;
  }

  items.forEach(function (item, index) {
    item.textContent = format(time[index]);
  });

  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired"> Sorry, Giveaway has ended.</h4>`;
  }
}
let countdown = setInterval(getRemainingTime, 1000);
