const alarmClock = document.getElementById('alarm-clock');

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

// show notification function
function showNotification(text){
    alert(text);
}

// Check if alarm with same type already exist or not
function isAlarmAlreadyExists(time){
    for(const element of alarms_list){
        if(element.time===time){
            return true;
        }
    }
    return false;
}

// Add Alarm To Dom
function addAlarmToDom(alarm){
    console.log('element:', alarm);
    const li = document.createElement('li');
    li.innerHTML = 
        `<input type="checkbox" id="${alarm.id}" ${alarm.completed ? '' : 'checked'} class="custom-checkbox">
        <label for="${alarm.id}">${alarm.time}</label>
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
        console.log(alarms_list);
        renderList();
        showNotification('Alarm added successfully');
        return;
    }
    showNotification('Alarm can not be added');

}

// Remove Clear Alarm Container
function removeClearAlarmContainer(){
    clearAlarmContainer.style.display = 'none';
    // timePicker.classList.remove("disable");
    alarmClock.classList.remove("disable");


}

// Display Clear Alarm Container 
function displayClearAlarmContainer(){

    clearAlarmTimeText.innerText = alarmTime;
    clearAlarmContainer.style.display = 'flex';
    clearAlarmContainer.style.left = `${window.innerWidth/2-clearAlarmContainer.offsetWidth/2}px`;
    clearAlarmContainer.style.top = '20px';
    // timePicker.classList.add("disable");
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
        // setAlarmBtn.innerText = "Set Alarm";
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
        renderList();
        if(currentAlarm.completed){
            showNotification("Alarm Turned Off!");
        }else{
            showNotification("Alarm Turned On!");
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

    // To check for alarm
    for (const alarm of alarms_list) {
        if(alarm.time == `${h}:${m} ${ampm}` && !isAlarmRinging && !alarm.completed)
        {
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
    // if(isAlarmSet){
    //     alarmTime = "";
    //     ringtone.pause();
    //     timePicker.classList.remove("disable");
    //     setAlarmBtn.innerText = "Set Alarm";
    //     return isAlarmSet = false;
    // }

    let time = `${hourInput.value}:${minuteInput.value} ${ampmInput.value}`;
    // isAlarmSet = true;
    // alarmTime = time;
    // timePicker.classList.add("disable");
    // setAlarmBtn.innerText = "Clear Alarm";

    const alarm = {
        time : time,
        id : Date.now(),
        completed : false
    };

    if(isAlarmAlreadyExists(time)){
        showNotification("Alarm with same time already Exist");
    }else{
        addAlarm(alarm);
    }
    // console.log(time);
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
    // console.log("Target",target);
    if(target.classList == 'custom-checkbox'){
        const alarmId = target.id;
        toggleAlarm(alarmId);
    }else if(target.classList.contains('delete')){
        const alarmID = target.dataset.id;
        deleteAlarm(alarmID);
    }
})