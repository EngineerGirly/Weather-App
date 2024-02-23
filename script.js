    /* Assigning specific dom elements to variables 
        for an easier scripting experience */
const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
arrow = wrapper.querySelector("header i"),
locationBtn = inputPart.querySelector("button");
let url = '';

      /******************** EVENT LISTENERS ********************/

// on click e.l on the arrow icon that removes the active class with a display property value of none
arrow.addEventListener("click", () => {
    wrapper.classList.remove("active");
});

// keyup e.l on the enter keyboard key that first checks if key pressed is the enter key and the text area is not blank/empty, then calls the initial fetch request to weatherapi.com  
inputField.addEventListener("keyup", e => {
    // if user presses enter and the input field is not empty
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value)
    }
});

// on click e.l placed on the button element which enables the geolocation api call if user accepts and browser is supported
locationBtn.addEventListener("click", ()=> {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }
    else {
        alert("Your browser does not support geolocation api")
    }

});

      /******************** EVENT LISTENERS ********************/

// onError callback function for the geolocation api fetch and eventlistener
function onError(error) {
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error")
}

// onSuccess callback function for the geolocation api fetch and eventlistener
function onSuccess(position) {
    //getting longitude and lat of user device from coords object
    const {latitude, longitude} = position.coords;
    //reassigning url variable to custom api link to fetch using lat and long coordinates
    url = `https://api.weatherapi.com/v1/current.json?key=48652c7f4b124a759e0103923241402&q=${latitude},${longitude}&aqi=no`;
    fetchData();
}

// callback function for keyup e.l
function requestApi(city) {
    // query parameter for the fetch request becomes the city value
    url = `https://api.weatherapi.com/v1/current.json?key=48652c7f4b124a759e0103923241402&q=${city}&aqi=yes`;
    // function call for 
    fetchData();
}

// function designed to fetch and manipulate some style in the dom as the fetch occurs
function fetchData() {
    infoTxt.innerText = "Getting weather details.."
    infoTxt.classList.add("pending")
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        // passes return api object as a parameter
        weatherDetails(data)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

// callback function used in the fetchData function
function weatherDetails(info) {
    // if input field was invalid / a non-existet city, classlist is replaced to manipulate dom visual and innertext is replaced to the error message from api obj
    if (info.error) {
        infoTxt.classList.replace("pending", "error")
        infoTxt.innerText = info.error.message;
    }
    // if a valid city is entered and fetch returns a valid obj
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

        // if / if-else statements that sets src to the img tag based on code property from api obj
        // statements can deifnitely be simplified, do later
        if (info.current.condition.code === 1000) {
            wrapper.querySelector('img').src = 'Weather Icons/clear.svg'
        }
        else if (info.current.condition.code === 1003 || info.current.condition.code === 1006 || info.current.condition.code === 1009) {
            wrapper.querySelector('img').src = 'Weather Icons/cloud.svg'
        }
        else if (info.current.condition.code === 1135) {
            wrapper.querySelector('img').src = 'Weather Icons/haze.svg'
        }
        else if (info.current.condition.code === 1030 || info.current.condition.code === 1063 || info.current.condition.code === 1072 || info.current.condition.code === 1150 || info.current.condition.code === 1180 || info.current.condition.code === 1153 || info.current.condition.code === 1183 || info.current.condition.code === 1186 || info.current.condition.code === 1189 || info.current.condition.code === 1192 || info.current.condition.code === 1195 || info.current.condition.code === 1240 || info.current.condition.code === 1243 || info.current.condition.code === 1246) {
            wrapper.querySelector('img').src = 'Weather Icons/rain.svg'
        }
        else if (info.current.condition.code === 1066 || info.current.condition.code === 1069 || info.current.condition.code === 1114 || info.current.condition.code === 1117 || info.current.condition.code === 1147 || info.current.condition.code === 1168 || info.current.condition.code === 1171 || info.current.condition.code === 1198 || info.current.condition.code === 1201 || info.current.condition.code === 1204 || info.current.condition.code === 1207 || info.current.condition.code === 1210 || info.current.condition.code === 1213 || info.current.condition.code === 1216 || info.current.condition.code === 1219 || info.current.condition.code === 1222 || info.current.condition.code === 1225 || info.current.condition.code === 1237 || info.current.condition.code === 1249 || info.current.condition.code === 1252 || info.current.condition.code === 1255 || info.current.condition.code === 1258 || info.current.condition.code === 1261 || info.current.condition.code === 1264) {
            wrapper.querySelector('img').src = 'Weather Icons/snow.svg'
        }
        else {
            wrapper.querySelector('img').src = 'Weather Icons/storm.svg'
        }

        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");

        // console.log(info)
    }
}