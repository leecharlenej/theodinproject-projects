let locationInput = 'London'

async function fetchLocationData (locationName) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationName}?unitGroup=us&key=TBU87BK768UWZGZ43Y6AMMZMT&contentType=json`, {mode:'cors'});
    const locationData = await response.json();
    console.log(locationData);
    return locationData;
}

function getLocationDetails (locationData) {
    
    const dateDetails = locationData.currentConditions.datetime;
    console.log(dateDetails);

    const temperature = locationData.currentConditions.temp;
    const temperatureFeelsLike = locationData.currentConditions.feelslike;
    console.log(temperature, temperatureFeelsLike);

    const conditionsDetails = locationData.currentConditions.conditions;
    console.log(conditionsDetails);

    const humidityDetails = locationData.currentConditions.humidity;
    console.log(humidityDetails);

    const locationObject ={
        "date": dateDetails,
        "temperature": temperature,
        "temperatureFeelsLike": temperatureFeelsLike,
        "conditionDetails": conditionsDetails,
        "humidityDetails": humidityDetails
    }
    
    return locationObject;
}


function changeTempToC (temperature) {
    const tempCelsius = (temperature-32) * 5/9
    return tempCelsius.toFixed(2);
}

function getLocationInput() {
    const locationInputBox = document.querySelector("#location-input");
    const locationInputValue = locationInputBox.value;
    console.log(locationInputValue);
    return locationInputValue;
}

async function main() {
    let locationDisplayInput = document.querySelector("#locationDisplayInput h2");
    let locationDisplayDate = document.querySelector("#locationDisplayDate");
    const locationDisplayTemp = document.querySelector("#locationDisplayTemp");
    const locationDisplayFeelsLike = document.querySelector("#locationDisplayFeelsLike");
    const locationDisplayConditions = document.querySelector("#locationDisplayConditions");
    const locationDisplayHumidity = document.querySelector("#locationDisplayHumidity");

    try {
        const locationInput = getLocationInput();
        const locationData = await fetchLocationData(locationInput);
        const locationObject = getLocationDetails(locationData);
        
        locationDisplayInput.textContent = locationInput;
        locationDisplayDate.textContent = locationObject.date;
        locationDisplayTemp.textContent = locationObject.temperature;
        locationDisplayFeelsLike.textContent = locationObject.temperatureFeelsLike;
        locationDisplayConditions.textContent = locationObject.conditionDetails;
        locationDisplayHumidity.textContent = locationObject.humidityDetails;
        
    }catch (error) {
        console.error(`'Error fetching location data: ' ${error}`);
        locationDisplayInput.textContent = "Location does not exist.";
        locationDisplayTemp.textContent = "";
        locationDisplayConditions.textContent = "";
    }
}

const searchButton = document.querySelector('#search-button');
searchButton.addEventListener("click", main);