const STORAGE_KEY = 'pomodoroTimerDuration';
let defaultDuration = 25; // default 25 minutes
let timeRemaining = 0;
let isRunning = false;
let timerInterval = null;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateDisplay() {
    const timeDisplay = document.querySelector('.time');
    timeDisplay.textContent = formatTime(timeRemaining);
}

function startTimer() {
    if (isRunning) return;

    isRunning = true;
    timerInterval = setInterval(function() {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateDisplay();
        } else {
            stopTimer();
            alert('Pomodoro session completed!');
        }
    }, 1000);
}

function stopTimer() {
    isRunning = false;
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetTimer() {
    stopTimer();
    const savedDuration = localStorage.getItem(STORAGE_KEY);
    const duration = savedDuration ? parseInt(savedDuration, 10) : defaultDuration;
    timeRemaining = duration * 60;
    updateDisplay();
}

function initializeTimer() {
    const savedDuration = localStorage.getItem(STORAGE_KEY);
    if (savedDuration) {
        defaultDuration = parseInt(savedDuration, 10);
    }
    timeRemaining = defaultDuration * 60;
    updateDisplay();
}

function updateCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeDisplay = document.getElementById('current-time-display');
    if (timeDisplay) {
        timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

// Initialize display on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeTimer();
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
});
