// work on get device location button, will need to retrieve lon and lat cordinates for api fetch
// start working on displaying weather info after a valid city has been entered 
// 

const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = wrapper.querySelector(".info-txt"),
inputField = wrapper.querySelector("input");

inputField.addEventListener("keyup", e => {
    // if user presses enter and the input field is not empty
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value)
    }
});

function requestApi(city) {
    let url = `https://api.weatherapi.com/v1/current.json?key=48652c7f4b124a759e0103923241402&q=${city}&aqi=yes`;
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
    console.log(info)
}




