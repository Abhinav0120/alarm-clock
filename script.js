// current time clock
const currentTime = document.getElementById('curret-time-clock');

// inputs
const hourInput = document.querySelector('#hour');
const minuteInput = document.querySelector('#minute');
const ampmInput = document.querySelector('#ampm');

// arrows
const hourUpArrow = document.querySelector('.hour-picker .arrow.up');
const hourDownArrow = document.querySelector('.hour-picker .arrow.down');
const minuteUpArrow = document.querySelector('.minute-picker .arrow.up');
const minuteDownArrow = document.querySelector('.minute-picker .arrow.down');
const ampmUpArrow = document.querySelector('.ampm-picker .arrow.up');
const ampmDownArrow = document.querySelector('.ampm-picker .arrow.down');

// set Alarm
const timePicker = document.querySelector('.time-picker');
const setAlarmBtn = document.getElementById('set-alarm');

let alarmTime;
let isAlarmSet = false;

let selectedHour = 12;
let selectedMinute = 0;
let selectedAmPm = ampmInput.value;

// Update the hour input field
function updateHourInput(){
    hourInput.value = selectedHour < 10 ? '0'+ selectedHour: selectedHour;
}
// Update the minute input field
function updateMinuteInput() {
    minuteInput.value = selectedMinute < 10 ? '0' + selectedMinute : selectedMinute;
}

// Increase Selected Hour by 1
function increaseHour(){
    selectedHour = selectedHour < 12 ? selectedHour+1 : 1;
    updateHourInput(); 
}

// Decrease Selected Hour by 1
function decreaseHour(){
    selectedHour = selectedHour > 1 ? selectedHour-1 : 12;
    updateHourInput();
}

// Increase Selected Minute by 1
function increaseMinute(){
    selectedMinute = selectedMinute < 59 ? selectedMinute+1 : 0;
    updateMinuteInput()
} 

// Decrease Selected Minute by 1
function decreaseMinute(){
    selectedMinute = selectedMinute > 0 ? selectedMinute-1 : 59;
    updateMinuteInput();
}

// Change Am Pm 
function changeAmPm(){
    selectedAmPm = selectedAmPm === 'AM'? selectedAmPm = 'PM': selectedAmPm = 'AM';
    ampmInput.value = selectedAmPm;
}

// for Current time 
setInterval(()=>{
    let date = new Date();
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";

    if(h >= 12){
        h = h-12;
        ampm = "PM";
    }
    //if hour value is 0, them set it's value to 12
    h = h == 0 ? h = 12 : h;
    // adding 0 before hr, min, sec if this value is less than 10
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    if(alarmTime ==`${h}:${m} ${ampm}`){
        console.log("Alarm ringing...");
    }

}, 1000);

// Set Alarm function
function setAlarm(){
    if(isAlarmSet){
        alarmTime = "";
        timePicker.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    }

    let time = `${hourInput.value}:${minuteInput.value} ${ampmInput.value}`;
    isAlarmSet = true;
    alarmTime = time;
    timePicker.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm";
    console.log(time);
}


// Handle Click Event
hourUpArrow.addEventListener('click',increaseHour);
hourDownArrow.addEventListener('click',decreaseHour);
minuteUpArrow.addEventListener('click',increaseMinute);
minuteDownArrow.addEventListener('click',decreaseMinute);
ampmUpArrow.addEventListener('click', changeAmPm);
ampmDownArrow.addEventListener('click', changeAmPm);

setAlarmBtn.addEventListener('click', setAlarm);
