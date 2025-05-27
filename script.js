// Get references to the clock hands
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');

// Function to get current time
function getCurrentTime() {
  const now = new Date();
  return {
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds()
  };
}

// Function to update clock hands
function updateClockHands() {
  const currentTime = getCurrentTime();

  // Calculate rotation for each hand
  // Seconds hand: 360 degrees in 60 seconds (6 degrees per second)
  const secondsRotation = currentTime.seconds * 6;
  // Minutes hand: 360 degrees in 60 minutes (6 degrees per minute) + partial rotation based on seconds
  const minutesRotation = (currentTime.minutes * 6) + (currentTime.seconds / 60) * 6;
  // Hours hand: 360 degrees in 12 hours (30 degrees per hour) + partial rotation based on minutes
  // Ensure hours are in 12-hour format for rotation calculation
  const hoursIn12Format = currentTime.hours % 12;
  const hoursRotation = (hoursIn12Format * 30) + (currentTime.minutes / 60) * 30;

  // Apply rotation to hands
  secondHand.style.transform = `translateX(-50%) rotate(${secondsRotation}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minutesRotation}deg)`;
  hourHand.style.transform = `translateX(-50%) rotate(${hoursRotation}deg)`;
}

// Update the clock every second
setInterval(updateClockHands, 1000);

// Initial call to set the clock hands without delay
updateClockHands();
