import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const datPic = document.querySelector("#datetime-picker");
const butStart = document.querySelector("button[data-start]");
const datDay = document.querySelector("span[data-start]");
const datHau = document.querySelector("span[data-hours]");
const datMin = document.querySelector("span[data-minutes]");
const datSec = document.querySelector("span[data-seconds]");

butStart.classList.add("button--inactive");
butStart.addEventListener("click", timer);

const currentData = new Date()
let userData;
flatpickr(datPic, options)

options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: currentData,
  minuteIncrement: 1,
  onClose(selectedDates) {
      userData=selectedDates[0];
      if (currentData > userData) {
        Notiflix.Notify.info("Great, now choose a date you don't want to miss😎");
      } else {
          Notiflix.Notify.warning("Error! I'm afraid the time machine hasn't been invented yet ¯\_(ツ)_/¯ ");
        butStart.classList.remuve("button--inactive");
      }
    
  },
};
function timer() {
    const id = setInterval(() => {
        const timerTime = convertMs(userData - currentData)
    if (timerTime.seconds>=0) {
        datDay.textContent = timerTime.days.toString().padStart(2, "0");
        datHau.textContent = timerTime.hours.toString().padStart(2, "0");  
        datMin.textContent = timerTime.minutes.toString().padStart(2, "0");  
         datSec.textContent = timerTime.seconds.toString().padStart(2, "0");  
    } else {
        clearInterval(id);
        Notiflix.Notify.info("job done time is up");
    }    
    })
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}