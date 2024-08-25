const MAX_FUEL = 28;
const BASE_TIME = 150000;
const CHECK_INTERVAL = 60000;

function getFuelIndicator() {
    const fuelIndicatorText = document.querySelector(".FuelIndicator_description__EaUsa").textContent;
    return parseInt(fuelIndicatorText.split(" ")[0]);
}

function clickButton(button) {
    button.click();
    console.log(`clicked ${button === doomBtn ? "DOOM ↘️" : "MOON ↗️"}`);
}

function startRefuelTimer() {
    const randomInterval = Math.random() * 120000;
    const totalTime = BASE_TIME + randomInterval;
    console.log("⏳ Refuel timer set for:", (totalTime / 60000).toFixed(2), "minutes");

    let remainingTime = totalTime;

    const interval = setInterval(() => {
        remainingTime -= CHECK_INTERVAL;

        if (getFuelIndicator() === MAX_FUEL) {
            clearInterval(interval);
            console.log(`⛽ Fuel indicator reached ${MAX_FUEL}, canceling refuel timer.`);
            clickButtonWithRandomInterval();
            return;
        }

        if (remainingTime > 0) {
            console.log("⏰ Time remaining:", (remainingTime / 60000).toFixed(2), "minutes");
        } else {
            clearInterval(interval);
            console.log("⏰ Timer finished, resuming clicks.");
            clickButtonWithRandomInterval();
        }
    }, CHECK_INTERVAL);
}

function clickButtonWithRandomInterval() {
    const fuelIndicator = getFuelIndicator();
    console.log("⛽ fuelIndicator:", fuelIndicator);

    const buttons = document.querySelectorAll(".ButtonContainer_btn__AmQTp");
    const moonBtn = buttons[0];
    const doomBtn = buttons[1];

    if (fuelIndicator > 0) {
        const randomChance = Math.random();
        console.log("🚀 randomChance:", randomChance);

        if (randomChance > 0.2) {
            clickButton(doomBtn);
        } else {
            clickButton(moonBtn);
        }
    } else if (fuelIndicator === 0) {
        startRefuelTimer();
        return;
    }

    const randomInterval = Math.random() * (12000 - 8500) + 8500;
    console.log("⌚ Interval:", randomInterval);

    setTimeout(clickButtonWithRandomInterval, randomInterval);
}

clickButtonWithRandomInterval();
