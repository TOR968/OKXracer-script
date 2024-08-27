const MAX_FUEL = 28; // Максимальний запас бензину
const BASE_TIME = 150000; // 2.5 хвилини у мілісекундах час на відновлення палива
const CHECK_INTERVAL = 60000; // Перевірка кожну хвилину
const RELOAD = false; // Встановити як true, щоб виконувалась функція refuel [true/false]
const percentOnDoom = 0.2; // % вибору кнопки DOOM, [0.1 = 10%, 0.2 = 20%]

async function clickButtonWithRandomInterval() {
    if (await checkAndClickAutoPilotButton()) {
        setTimeout(clickButtonWithRandomInterval, 1000);
        return;
    }

    const fuelIndicator = getFuelIndicator();

    if (fuelIndicator === null) {
        setTimeout(clickButtonWithRandomInterval, 1000);
        return;
    }

    console.log("⛽️ fuelIndicator:", fuelIndicator);

    const buttons = document.querySelectorAll(".ButtonContainer_btn__AmQTp");
    const moonBtn = buttons[0];
    const doomBtn = buttons[1];

    if (fuelIndicator > 0) {
        const randomChance = Math.random();
        console.log("🚀 randomChance:", randomChance);

        if (randomChance > percentOnDoom) {
            await clickButton(doomBtn, "DOOM ↘️");
        } else {
            await clickButton(moonBtn, "MOON ↗️");
        }
    } else if (fuelIndicator === 0) {
        if (RELOAD) {
            await refuel();
        }
        startRefuelTimer();
        return;
    }

    const randomInterval = Math.random() * (10000 - 7500) + 7500;
    console.log("⌚️ Interval:", randomInterval);

    setTimeout(clickButtonWithRandomInterval, randomInterval);
}

async function checkAndClickAutoPilotButton() {
    const periodicButton = document.querySelector(".PrimaryButton_button__SJFHA.AutoPilot_button__Sg42v");

    if (periodicButton) {
        await clickButton(periodicButton, "AutoPilot 🧑‍✈️");
        return true;
    }

    return false;
}

function getFuelIndicator() {
    const fuelIndicatorText = document.querySelector(".FuelIndicator_description__EaUsa")?.textContent;

    if (!fuelIndicatorText) {
        console.log("🔄 Waiting for fuel indicator to become available...");
        setTimeout(clickButtonWithRandomInterval, 1000);
        return null;
    }

    return parseInt(fuelIndicatorText.split(" ")[0]);
}

async function clickButton(button, label) {
    if (button) {
        button.click();
        console.log(`clicked ${label}`);
        await delay(Math.random() * 500 + 1000);
    } else {
        console.error(`Button for ${label} not found!`);
    }
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function refuel() {
    const taskBtn = document.querySelectorAll("a.Navbar_link__qX0Sf")[2];
    const raceBtn = document.querySelectorAll("a.Navbar_link__qX0Sf")[0];

    await clickButton(taskBtn, "Task ✅");

    const boostStageText = document.querySelector(".index_boost-data-stage__8CAgC")?.textContent;
    if (boostStageText != "0/3") {
        await clickButton(document.querySelectorAll(".index_boost-item__k6pnm")[1], "Reload Fuel Tank ⛽");
        await clickButton(document.querySelector(".PrimaryButton_button__SJFHA.index_btn__bxKiJ"), "Apply Upgrade 🛠️");
    }

    await clickButton(raceBtn, "Race 🏁");
}

async function startRefuelTimer() {
    const randomInterval = Math.random() * 120000;
    const totalTime = BASE_TIME + randomInterval;
    console.log("⏳ Refuel timer set for:", (totalTime / 60000).toFixed(2), "minutes");

    let remainingTime = totalTime;

    const interval = setInterval(async () => {
        remainingTime -= CHECK_INTERVAL;

        const currentFuelIndicator = getFuelIndicator();
        if (currentFuelIndicator === MAX_FUEL) {
            clearInterval(interval);
            console.log(`⛽️ Fuel indicator reached ${MAX_FUEL}, canceling refuel timer.`);
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

clickButtonWithRandomInterval();