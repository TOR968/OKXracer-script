setInterval(function () {
    const fuelIndicatorText = document.querySelector(
        ".FuelIndicator_description__EaUsa"
    ).textContent;

    const fuelIndicator = parseFloat(fuelIndicatorText.split(" ")[0]);

    if (fuelIndicator >= 0) {
        document.querySelector(".ButtonContainer_btn__AmQTp").click();
    }
}, 9000);
