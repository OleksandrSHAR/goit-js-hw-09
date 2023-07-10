import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const datPic = document.querySelector("#datetime-picker");
const butStart = document.querySelector("button[data-start]");
const datDay = document.querySelector("span[data-days]");
const datHau = document.querySelector("span[data-hours]");
const datMin = document.querySelector("span[data-minutes]");
const datSec = document.querySelector("span[data-seconds]");

butStart.classList.add("button--inactive");
butStart.addEventListener("click", timer);

const currentData = new Date()
let userData;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
 
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: currentData,
  minuteIncrement: 1,
  onClose(selectedDates) {
    userData = selectedDates[0];
    butStart.disabled = true;
    if (currentData < userData) {
        butStart.disabled = false;
        Notiflix.Notify.info("Great, now choose a date you don't want to miss😎");
      } else if (currentData>userData) {
      butStart.disabled = true;
      Notiflix.Notify.warning("Error! I'm afraid the time machine hasn't been invented yet ¯\_(ツ)_/¯ ");
        butStart.classList.remove("button--inactive");
      }
    
  },
};
flatpickr(datPic, options)
function timer() {
  const id = setInterval(() => {
    
    const timerTime = userData - Date.now();
    const { days, hours, minutes, seconds } = convertMs(timerTime);
    
      datDay.textContent = tamerZero(days);
      datHau.textContent = tamerZero(hours);
      datMin.textContent = tamerZero(minutes);
      datSec.textContent = tamerZero(seconds);
     if(timerTime<=0)  {
      clearInterval(id);

      Notiflix.Notify.info("job done time is up");
    }
  }, 1000);
}
function tamerZero(value) {
  return String(value).padStart(2, '0');
}

