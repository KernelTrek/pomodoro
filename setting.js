const MIN_DURATION = 1;
const MAX_DURATION = 60;
const STORAGE_KEY = 'pomodoroTimerDuration';

function validateInput() {
    const input = document.getElementById('timer-duration');
    const completeBtn = document.querySelector('.btn-complete');
    const value = input.value.trim();

    if (value === '') {
        completeBtn.disabled = true;
        completeBtn.style.opacity = '0.5';
        completeBtn.style.cursor = 'not-allowed';
        return false;
    }

    const duration = parseInt(value, 10);

    if (isNaN(duration) || duration < MIN_DURATION || duration > MAX_DURATION) {
        completeBtn.disabled = true;
        completeBtn.style.opacity = '0.5';
        completeBtn.style.cursor = 'not-allowed';
        return false;
    }

    completeBtn.disabled = false;
    completeBtn.style.opacity = '1';
    completeBtn.style.cursor = 'pointer';
    return true;
}

function saveDuration() {
    const input = document.getElementById('timer-duration');
    const value = parseInt(input.value, 10);

    if (!validateInput()) {
        return;
    }

    localStorage.setItem(STORAGE_KEY, value);
    alert('Settings saved! Timer duration changed to ' + value + ' minutes.');
    window.location.href = 'index.html';
}

function loadDuration() {
    const input = document.getElementById('timer-duration');
    const savedDuration = localStorage.getItem(STORAGE_KEY);

    if (savedDuration) {
        input.value = savedDuration;
    }

    validateInput();
}

document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('timer-duration');
    const completeBtn = document.querySelector('.btn-complete');

    loadDuration();

    input.addEventListener('input', validateInput);
    input.addEventListener('change', validateInput);

    completeBtn.addEventListener('click', saveDuration);
});
