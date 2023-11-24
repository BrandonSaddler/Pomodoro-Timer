let workDuration = 30 * 60;
let breakDuration = 5 * 60;
let timer;
let isWorking = true;

function startPomodoro() {
  timer = setInterval(updateTimer, 1000);
  updateTimer(); // Initial call to display the first second
}

function pausePomodoro() {
  clearInterval(timer);
  document.getElementById("timer").innerText = "Timer paused";
}

// function stopPomodoro() {
//   clearInterval(timer);
//   document.getElementById("timer").innerText = "Timer stopped.";
// }

//Stop essentially works the same way as pause so there is not a use for it currently.

function resetPomodoro() {
  clearInterval(timer);
  isWorking = true;
  workDuration = getSelectedWorkDuration() * 60;
  breakDuration = 5 * 60; // Reset break duration
  document.getElementById("timer").innerText = "Timer reset";
}

function updateTimer() {
  if (isWorking) {
    document.getElementById("timer").innerText = formatTime(workDuration);
    workDuration--;

    if (workDuration < 0) {
      isWorking = false;
      workDuration = getSelectedWorkDuration() * 60; // Reset work duration
      alert("Take a break!");
    }
  } else {
    document.getElementById("timer").innerText = formatTime(breakDuration);
    breakDuration--;

    if (breakDuration < 0) {
      isWorking = true;
      breakDuration = 5 * 60; // Reset break duration
      alert("Resume study!");
    }
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function updateWorkDuration() {
  workDuration = getSelectedWorkDuration() * 60;
  resetPomodoro();
}

function getSelectedWorkDuration() {
  const dropdown = document.getElementById("workDuration");
  return parseInt(dropdown.options[dropdown.selectedIndex].value);
}

