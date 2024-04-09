const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const formAlarm = document.getElementById('form-alarm');
let alarmSong = null;
let showNotification = false;
let notificationCounter = 0;

document.addEventListener('DOMContentLoaded', () => {
  if ('Notification' in window) {
    Notification.requestPermission((request) => {
      
      showNotification = request === 'granted';

      if (!showNotification) {
        const [input, button] = formAlarm.children;
        input.disabled = true;
        input.value = "";
        button.disabled = true;
      }
    });
  }

  if (localStorage.getItem('alarma') !== null) {
    const input = formAlarm.children[0];
    //  yyyy-mm-ddThh:mm

    localStorage.getItem('alarma');
    const alarmaFormato = new Date(localStorage.getItem('alarma'));
    const alarmYear = alarmaFormato.getFullYear();
    const alarmMonth = alarmaFormato.getMonth();
    const alarmDay = alarmaFormato.getDate();
    const alarmHours = alarmaFormato.getHours();
    const alarmMinutes = alarmaFormato.getMinutes();

    input.value = `${alarmYear}-${formatNumber(alarmMonth)}-${formatNumber(alarmDay)}T${formatNumber(alarmHours)}:${alarmMinutes}`;
  }

  getCurrentTime();
});

setInterval(() => {
  getCurrentTime();
}, 1000);

formAlarm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const value = formData.get('time');
  console.log(value);

  if (value === null || value === "") {
    alert("Ponga la fecha primero");
    return;
  }
    
  const currentDate = new Date();
  const setAlarm = new Date(value);

  if (isValidDate(currentDate, setAlarm)) {
    alert("Pero ponga bien la fecha mijo");
    return;
  }

  localStorage.setItem('alarma', setAlarm.toString());
});

const showAlarm = () => {
  if (showNotification && localStorage.getItem('alarma') !== null) {
    const currentTime = new Date();
    const alarm = new Date(localStorage.getItem('alarma'));

    const isSameYear = alarm.getFullYear() === currentTime.getFullYear();
    const isSameMouth = alarm.getMonth() === currentTime.getMonth();
    const isSameDay = alarm.getDate() === currentTime.getDate();
    const isSameHours = alarm.getHours() === currentTime.getHours();
    const isSameMinutes = alarm.getMinutes() === currentTime.getMinutes();

    if (isSameYear && isSameMouth && isSameDay && isSameHours && isSameMinutes && notificationCounter <= 10) {
      new Notification("Ya es hora buey");
      
      if (alarmSong === null) {
        alarmSong = new Audio('./alarma.mp3').play();
      }
      notificationCounter++;
    }

    if (notificationCounter >= 10) {
      formAlarm.children[0].value = "";
      localStorage.removeItem('alarma');
      alarmSong.pause();
    }
    
  }
};

function getCurrentTime() {
  showAlarm();

  const currentDate = new Date();
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentSeconds = currentDate.getSeconds();

  hours.innerText = formatNumber(currentHours);
  minutes.innerText = formatNumber(currentMinutes);
  seconds.innerText = formatNumber(currentSeconds);
}

function isValidDate(currentDate, setAlarm) {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();

  const alarmYear = setAlarm.getFullYear();
  const alarmMonth = setAlarm.getMonth();
  const alarmDay = setAlarm.getDate();
  const alarmHours = setAlarm.getHours();
  const alarmMinutes = setAlarm.getMinutes();

  const añoAlarmaEsMenor = alarmYear < currentYear;
  const añoAlarmaIgual = alarmYear === currentYear;
  const mesAlarmaEsMenor = alarmMonth < currentMonth;
  const mesAlarmaIgual = alarmMonth === currentMonth;
  const diaAlarmaEsMenor = alarmDay < currentDay;
  const diaAlarmaIgual = alarmDay === currentDay;
  const horaAlarmaEsMenor = alarmHours < currentHours;
  const horaAlarmaIgual = alarmHours === currentHours;
  const minutosAlarmaEsMenorIgual = alarmMinutes <= currentMinutes;

  return (
    añoAlarmaEsMenor ||
    añoAlarmaIgual && mesAlarmaEsMenor ||
    añoAlarmaIgual && mesAlarmaIgual && diaAlarmaEsMenor ||
    añoAlarmaIgual && mesAlarmaIgual && diaAlarmaIgual && horaAlarmaEsMenor ||
    añoAlarmaIgual && mesAlarmaIgual && diaAlarmaIgual && horaAlarmaIgual && minutosAlarmaEsMenorIgual
  );
}

function formatNumber(value) {
  if (value < 10) {
    return "0" + value;
  } else {
    return value;
  }
}