const cityName = document.getElementById('cityName')
const description = document.getElementById('des')
const tempreture = document.getElementById('tempValue')
const imgg = document.getElementById('imgg')
const input = document.getElementById('input')
const myForm = document.getElementById('myForm')
const apiKey = "a83ef4716f5723812feb26d1470f5714"

//This function get your current weather data
const getCoord = () => {
   if("geolocation" in navigator){
     navigator.geolocation.getCurrentPosition(setPosition, showError)
   }else{
     alert("Your browser doesn't support geolocation")
   }
}

const setPosition = (position) => {

  let latitude =  position.coords.latitude
  let longitude = position.coords.longitude
  getCoordWeather(latitude, longitude)
}

const showError = (error) =>{
  alert(`${error.message}`)
}


const getCoordWeather = (latitude, longitude) => {
  let apiGeo = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
   fetch(apiGeo)
   .then((response) => response.json())
   .then((details) => {
     
    tempreture.innerHTML = `${details.main.temp}<span class="sym" >&#8451;</span>`
    cityName.innerHTML = details.name
 description.innerHTML = details.weather[0].description
 let iconn = details.weather[0].icon
 let imageUrll = `http://openweathermap.org/img/wn/${iconn}@2x.png`
 imgg.innerHTML = `<img class="img" src="${imageUrll}"/>`


   })
}


 window.onload = getCoord

//This function gets weather data for your search
const getWeather = () => {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`
    
    fetch(api)
    .then((res) => res.json())
    .then((data) =>{
      tempreture.innerHTML = `${data.main.temp}<span class="sym" >&#8451;</span>`
        cityName.innerHTML = data.name
     description.innerHTML = data.weather[0].description
     let icon = data.weather[0].icon
     let imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
     imgg.innerHTML = `<img class="img" src="${imageUrl}"/>`

    })
  .catch(() => {
    if(!input.value){
      alert('Please input a city name')
    }else{
      alert('City not found')
    }
    
  })
}

myForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    getWeather()
})


