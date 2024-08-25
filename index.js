const MAX_FUEL = 28;
const BASE_TIME = 150000;

function clickButtonWithRandomInterval() {
    const randomChance = Math.random();
    console.log("🚀 randomChance:", randomChance);

    const fuelIndicatorText = document.querySelector(".FuelIndicator_description__EaUsa").textContent;
    const fuelIndicator = parseInt(fuelIndicatorText.split(" ")[0]);
    console.log("⛽ fuelIndicator:", fuelIndicator);

    const buttons = document.querySelectorAll(".ButtonContainer_btn__AmQTp");
    const moonBtn = buttons[0];
    const doomBtn = buttons[1];

    if (fuelIndicator > 0) {
        if (randomChance > 0.2) {
            doomBtn.click();
            console.log("clicked DOOM ↘️");
        } else {
            moonBtn.click();
            console.log("clicked MOON ↗️");
        }
    } else if (fuelIndicator === 0) {
        const randomInterval = randomChance * 120000;
        const totalTime = BASE_TIME + randomInterval;
        console.log("⏳ Refuel timer set for:", (totalTime / 60000).toFixed(2), "minutes");

        let remainingTime = totalTime;

        const interval = setInterval(() => {
            remainingTime -= 60000;

            const currentFuelIndicatorText = document.querySelector(".FuelIndicator_description__EaUsa").textContent;
            const currentFuelIndicator = parseInt(currentFuelIndicatorText.split(" ")[0]);

            if (currentFuelIndicator === 28) {
                clearInterval(interval);
                console.log("⛽ Fuel indicator reached " + MAX_FUEL + ", canceling refuel timer.");
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
        }, 60000);

        return;
    }

    const randomInterval = randomChance * (12000 - 8500) + 8500;
    console.log("⌚ Interval:", randomInterval);

    setTimeout(clickButtonWithRandomInterval, randomInterval);
}

clickButtonWithRandomInterval();
