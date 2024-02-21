
// work on arrow to return to search screen after weather data has been displayed for a valid city
// need to work on displaying the appropriate weather icon. (use weather codes returned with object, check documentation)


const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button");

let url = '';


inputField.addEventListener("keyup", e => {
    // if user presses enter and the input field is not empty
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value)
    }
});

locationBtn.addEventListener("click", ()=> {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }
    else {
        alert("Your browser does not support geolocation api")
    }

})

function onError(error) {
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error")
}

function onSuccess(position) {
    //getting longitude and lat of user device from coords object
    console.log(position)
    const {latitude, longitude} = position.coords;
    url = `https://api.weatherapi.com/v1/current.json?key=48652c7f4b124a759e0103923241402&q=${latitude},${longitude}&aqi=no`;
    fetchData();
}


function requestApi(city) {
    url = `https://api.weatherapi.com/v1/current.json?key=48652c7f4b124a759e0103923241402&q=${city}&aqi=yes`;
    fetchData();
}

function fetchData() {
    infoTxt.innerText = "Getting weather details.."
    infoTxt.classList.add("pending")
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        weatherDetails(data)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function weatherDetails(info) {
    if (info.error) {
        infoTxt.classList.replace("pending", "error")
        infoTxt.innerText = info.error.message;
    }
    else {
        // grabbing values from api weather object
        const city = info.location.name;
        const state = info.location.region;
        const description = info.current.condition.text;
        const feelsLike = info.current.feelslike_f;
        const humidity = info.current.humidity;
        const temp = info.current.temp_f;

        // setting above values to the corresponding html elements
        wrapper.querySelector(".location span").innerText = `${city}, ${state}`;
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".number-2").innerText = feelsLike;
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;
        wrapper.querySelector(".number").innerText = temp; 


        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");

        console.log(info)
    }
}




