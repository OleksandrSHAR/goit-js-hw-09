import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');
const formBut = document.querySelector('button[type="submit"]')

formBut.addEventListener('click', promisTim)

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(()=>{
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
       }, delay);
  });
}
function promisTim(e) {
  e.preventDefault();

  let delayVal = Number(delay.value);
  let stepVal = Number(step.value);
  let amountVal = Number(amount.value);
  
  for (let i = 1; i <= amountVal; i+=1) {
  
    createPromise(i,delayVal )
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
delayVal += stepVal
  }
}
