const alarmClock = document.getElementById('alarm-clock');

// current time clock
const currentTime = document.getElementById('current-time-clock');

// inputs
const hourInput = document.querySelector('#hour');
const minuteInput = document.querySelector('#minute');
const ampmInput = document.querySelector('#ampm');
const dateInput = document.getElementById('dateInput');

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

// clear Alarm
const clearAlarmContainer = document.getElementById('clear-alarm-container');
const clearAlarmBtn = document.getElementById('clear-alarm');
const clearAlarmTimeText = document.querySelector('.clear-alarm-time');

let alarmTime;
let ringtone = new Audio("./assets/ring_tones/ringtone2.mp3");
// let isAlarmSet = false;
let isAlarmRinging = false;

let selectedHour = 12;
let selectedMinute = 0;
let selectedAmPm = ampmInput.value;

// Alarms List
let alarms_list = [];
const alarmLists = document.getElementById('alarm-lists');

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
    selectedAmPm = selectedAmPm === 'AM'? 'PM': 'AM';
    ampmInput.value = selectedAmPm;
}

// function to set default date of Inputdate to current date
function setDefaultDate(){
    let currentDate = new Date().toISOString().slice(0,10);
    dateInput.value = currentDate;
}
setDefaultDate();

// show notification function
function showNotification(text){
    alert(text);
}

// Check if alarm with same type already exist or not
function isAlarmAlreadyExists(time, date){
    for(const element of alarms_list){
        if(element.time===time && element.date == date){
            return true;
        }
    }
    return false;
}

// Add Alarm To Dom
function addAlarmToDom(alarm){
    const li = document.createElement('li');
    li.innerHTML = 
        `<input type="checkbox" id="${alarm.id}" ${alarm.completed ? '' : 'checked'} class="custom-checkbox">
        <label id="toggle-alarm" class="toggle" for="${alarm.id}">
            <i class="${alarm.completed ? 'fa-solid fa-toggle-off' : 'fa-solid fa-toggle-on'}"></i>
        </label>
        <label class="alarm-time" for="${alarm.id}">
            <span>
                ${alarm.time}
            </span>
            <span>
                ${alarm.date}
            </span>
        </label>
        <i class="fa-solid fa-trash delete" data-id="${alarm.id}"></i> `
    alarmLists.append(li);
}

// render List function
function renderList(){
    alarmLists.innerHTML = '';

    for(const alarm of alarms_list){
        addAlarmToDom(alarm);
    }
}

// Add alarm function
function addAlarm(alarm){
    if(alarm){
        alarms_list.push(alarm);
        renderList();
        showNotification('Alarm added successfully');
        return;
    }
    showNotification('Alarm can not be added');

}

// Remove Clear Alarm Container
function removeClearAlarmContainer(){
    clearAlarmContainer.style.display = 'none';
    alarmClock.classList.remove("disable");


}

// Display Clear Alarm Container 
function displayClearAlarmContainer(){

    clearAlarmTimeText.innerText = alarmTime;
    clearAlarmContainer.style.display = 'flex';
    clearAlarmContainer.style.left = `${window.innerWidth/2-clearAlarmContainer.offsetWidth/2}px`;
    clearAlarmContainer.style.top = '200px';
    alarmClock.classList.add("disable");

}

// Clear Alarm function
function clearAlarm(){
    if(isAlarmRinging){
        alarmTime = "";
        ringtone.pause();
        removeClearAlarmContainer();
        console.log("Alarm Stoped...");
        renderList();
        isAlarmRinging = false;
        return;
    }
}

// Toogling the alarm to turn it of or on
function toggleAlarm(alarmId){
    const alarm1 = alarms_list.filter(function(alarm){
        return alarm.id === Number(alarmId);
    });

    if(alarm1.length>0)
    {
        const currentAlarm = alarm1[0];
        
        currentAlarm.completed = !currentAlarm.completed;

        // Toggle icon
        // const toggleIcon = document.querySelector(`label[for="${currentAlarm.id}"] i`);
        // console.log(toggleIcon);
        
        renderList();
        if(currentAlarm.completed){
            // showNotification("Alarm Turned Off!");
            // toggleIcon.classList.remove('fa-toggle-on');
            // toggleIcon.classList.add('fa-toggle-off');
        }else{
            // showNotification("Alarm Turned On!");
            // toggleIcon.classList.remove('fa-toggle-off');
            // toggleIcon.classList.add('fa-toggle-on');
        }
        return;
    }

    showNotification("failed to turn off the alarm");
}

// Deleting Alarm function
function deleteAlarm(alarmID){
    const new_Alarms_list = alarms_list.filter(function(alarm){
        return alarm.id != Number(alarmID);
    });

    alarms_list = new_Alarms_list;
    renderList();
    showNotification('Alarm Deleted Successfully');
} 


// for Current time 
setInterval(()=>{
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ampm = "AM";

    if(h >= 12){
        h = h-12;
        ampm = "PM";
    }
    //if hour value is 0, them set it's value to 12
    h = h == 0 ? 12 : h;
    // adding 0 before hr, min, sec if this value is less than 10
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let currentDateValue = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    
    // To check for alarm
    for (const alarm of alarms_list) {
        
        if(alarm.time == `${h}:${m} ${ampm}` && currentDateValue === alarm.date && !isAlarmRinging && !alarm.completed)
        {
            console.log('currentDate:',currentDateValue);
            console.log('alarmDate',alarm.date);
            console.log("Alarm ringing...");
            ringtone.play();
            ringtone.loop = true;
            isAlarmRinging = true;
            alarm.completed = true;
            alarmTime = alarm.time;
            displayClearAlarmContainer();
        }
    }

}, 1000);

// Set Alarm function
function setAlarm(){
    let time = `${hourInput.value}:${minuteInput.value} ${ampmInput.value}`;
    const alarm = {
        time : time,
        id : Date.now(),
        completed : false,
        date : dateInput.value
    };

    let currentDate = new Date();
    let alarmDate = new Date(alarm.date);

    // Set the time portion of both dates to 00:00:00 for accurate comparison
    currentDate.setHours(0, 0, 0, 0);
    alarmDate.setHours(0, 0, 0, 0);

    if(isAlarmAlreadyExists(time, alarm.date)){
        showNotification("Alarm with same time already Exist");
    }else if(alarmDate < currentDate){
        showNotification("Alarm date can not be earlier than cuurent date.");
    }
    else{
        addAlarm(alarm);
    }
}


// Handle Click Event
hourUpArrow.addEventListener('click',increaseHour);
hourDownArrow.addEventListener('click',decreaseHour);
minuteUpArrow.addEventListener('click',increaseMinute);
minuteDownArrow.addEventListener('click',decreaseMinute);
ampmUpArrow.addEventListener('click', changeAmPm);
ampmDownArrow.addEventListener('click', changeAmPm);

setAlarmBtn.addEventListener('click', setAlarm);

clearAlarmBtn.addEventListener('click', clearAlarm);


// Handle click Event Using Event Deligation
alarmLists.addEventListener('click', function(event){
    const target = event.target;
    if(target.classList == 'custom-checkbox'){
        const alarmId = target.id;
        toggleAlarm(alarmId);
    }else if(target.classList.contains('delete')){
        const alarmID = target.dataset.id;
        deleteAlarm(alarmID);
    }
})