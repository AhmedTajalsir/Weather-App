const cityForm = document.querySelector('form')
const card = document.querySelector('.card')
const details = document.querySelector('.details')
const time = document.querySelector('.time')
const icon = document.querySelector('.icon img')
const forecast = new Forecast()
const updateUI =  (data) =>{
    // const cityDets = data.cityDets
    // const weather = data.weather

    // destructuring properties

    const { cityDets , weather} = data

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    
    `
    // update the night/day icon images

    let imgSrc = weather.IsDayTime ? 'imgs/day.svg' : 'imgs/night.svg';
    // if(weather.IsDayTime){
    //     imgSrc = 'imgs/day.svg'
    // }else{
    //     imgSrc = 'imgs/night.svg'
    // }
    time.setAttribute('src', imgSrc)
    // icon
    const iconSrc = `imgs/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc)
    
    // remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
    }

}

const updateCity = async (city) => {
    console.log(city);
    const cityDets = await getCity(city)
    const weather = await getWeather(cityDets.Key)

    // return {
    //     cityDets: cityDets,
    //     weather: weather
    // }
    // object shorthand notation
    return { cityDets , weather}

}

cityForm.addEventListener('submit' , (e)=>{
    // prevent default action
    e.preventDefault() 

    // city Value
    const city = cityForm.city.value.trim()
    cityForm.reset()
    
    //update the ui with new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err))

// set localStorage
    localStorage.setItem('city', city)
})

// Ternary operator
const check = false ? 'value 1' : 'value 2'
console.log(check);

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err))
}