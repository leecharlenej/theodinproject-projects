let locationInput = 'London'

async function fetchLocationData (locationName) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationName}?unitGroup=us&key=TBU87BK768UWZGZ43Y6AMMZMT&contentType=json`, {mode:'cors'});
    const locationData = await response.json();
    console.log(locationData);
    return locationData;
}

function getLocationTemp (locationData) {
    const tempInF = locationData.currentConditions.temp;
    const tempInC = changeTempToC(tempInF);
    return tempInC;
}

function changeTempToC (temperature) {
    const tempCelsius = (temperature-32) * 5/9
    return tempCelsius.toFixed(2);
}

function getLocationConditions (locationData) {
    const tempConditions = locationData.currentConditions.conditions;
    return tempConditions;
}

function getLocationInput() {
    const locationInputBox = document.querySelector("#location-input");
    const locationInputValue = locationInputBox.value;
    console.log(locationInputValue);
    return locationInputValue;
}

async function displayLocationData () {
    let locationDisplayInput = document.querySelector("#locationDisplayInput");
    const locationDisplayTemp = document.querySelector("#locationDisplayTemp");
    const locationDisplayConditions = document.querySelector("#locationDisplayConditions");

    try {
        const locationInput = getLocationInput();
        const locationData = await fetchLocationData(locationInput);
        const locationTemp = getLocationTemp(locationData);
        const locationConditions = getLocationConditions(locationData);
        console.log (locationTemp);

        
        locationDisplayInput.textContent = locationInput;
        locationDisplayTemp.textContent = locationTemp;
        locationDisplayConditions.textContent = locationConditions;
        
    }catch (error) {
        console.error(`'Error fetching location data: ' ${error}`);
        locationDisplayInput.textContent = "Location does not exist.";
        locationDisplayTemp.textContent = "";
        locationDisplayConditions.textContent = "";
    }
}

const searchButton = document.querySelector('#search-button')
searchButton.addEventListener("click", displayLocationData)