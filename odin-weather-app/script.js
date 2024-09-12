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

function getLocationInput() {
    const locationInputBox = document.querySelector("#location-input");
    const locationInputValue = locationInputBox.value;
    console.log(locationInputValue);
    return locationInputValue;
}

async function main() {
    const locationResults = document.querySelector(".location-results");
    const locationDisplayInput = document.querySelector("#locationDisplayInput h2");
    const locationDisplayDate = document.querySelector("#locationDisplayDate");
    const locationDisplayTemp = document.querySelector("#locationDisplayTemp");
    const locationDisplayFeelsLike = document.querySelector("#locationDisplayFeelsLike");
    const locationDisplayConditions = document.querySelector("#locationDisplayConditions");
    const locationDisplayHumidity = document.querySelector("#locationDisplayHumidity");

    try {
        const locationInput = getLocationInput();
        const locationData = await fetchLocationData(locationInput);
        const locationObject = getLocationDetails(locationData);
        
        locationResults.classList.remove("hidden");
        toggleButton.classList.remove("hidden");
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


let tempFahrenheitFlag = true;

function toggleTemp (temperature, type) {

    let temperatureObject = {
        "temperature": 0,
        "buttonMessage": ''
    }

    if (tempFahrenheitFlag) {
        const tempCelsius = (temperature-32) * 5/9;
        temperatureObject.temperature = tempCelsius.toFixed(1);
        temperatureObject.buttonMessage = 'Change to Fahrenheit';
        if(type==='temp') {
            tempFahrenheitFlag = false;
        };
        

    } else {
        const tempFahrenheit = (temperature * 9/5) + 32;
        temperatureObject.temperature = tempFahrenheit.toFixed(1);
        temperatureObject.buttonMessage = 'Change to Celsius';
        if(type==="temp") {
            tempFahrenheitFlag = true;
        };
    } 

    return temperatureObject;
}

function changeTempDisplay () {
    const temperatureObject = (toggleTemp(parseFloat(locationDisplayTemp.textContent),'temp'));
    console.log(temperatureObject);
    locationDisplayTemp.textContent = temperatureObject.temperature;
    toggleButton.textContent = temperatureObject.buttonMessage;

    const feelsLikeObject = (toggleTemp(parseFloat(locationDisplayFeelsLike.textContent),'feelslike'))
    locationDisplayFeelsLike.textContent = feelsLikeObject.temperature;

}

const toggleButton = document.querySelector('#toggle-button');
toggleButton.addEventListener("click", changeTempDisplay);

const clearButton = document.querySelector('#clear-button');
clearButton.addEventListener("click", ()=> {
    const locationResults = document.querySelector(".location-results");
    locationResults.classList.add("hidden")
    const locationInput = document.querySelector("#location-input");
    locationInput.value="";
});
