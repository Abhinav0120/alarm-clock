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


// Handle Click Event
hourUpArrow.addEventListener('click',increaseHour);
hourDownArrow.addEventListener('click',decreaseHour);
minuteUpArrow.addEventListener('click',increaseMinute);
minuteDownArrow.addEventListener('click',decreaseMinute);
ampmUpArrow.addEventListener('click', changeAmPm);
ampmDownArrow.addEventListener('click', changeAmPm);
