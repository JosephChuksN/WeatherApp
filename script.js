const cityName = document.getElementById('cityName')
const description = document.getElementById('des')
const tempreture = document.getElementById('tempValue')
const imgg = document.getElementById('imgg')
const input = document.getElementById('input')
const myForm = document.getElementById('myForm')
const apiKey = "a83ef4716f5723812feb26d1470f5714"



const getWeather = () => {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`
    
    fetch(api)
    .then((res) => res.json())
    .then((data) =>{
      tempreture.innerHTML = `${data.main.temp}<span>&#8451;</span>`
        cityName.innerHTML = data.name
     description.innerHTML = data.weather[0].description
     let icon = data.weather[0].icon
     let imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
     imgg.innerHTML = `<img src="${imageUrl}"/>`


    })

}

myForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    getWeather()
})
