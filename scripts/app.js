const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

//for upadting the UI once we have data
const updateUI = (data)=>{
    
    //destructuring
    const {cityDets, weather} = data;
    
    //updating the deatils
    details.innerHTML = `
    <h5 class="my-3">${cityDets.LocalizedName}</h5>
    <div class="my-3">${weather[0].WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather[0].Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

    //making the card visibile
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

    //updating the images
    let timeSrc = weather[0].IsDayTime?'img/day.svg' :'img/night.svg';
    time.setAttribute('src', timeSrc);

    //updating the icon 
    const iconSrc = `img/icons/${weather[0].WeatherIcon}.svg`;
    icon.setAttribute('src',iconSrc);
}

//to check for the most recent searched city and display it
const checker = () =>{
    if(localStorage.length>0){
        // console.log("im here");
        forecast.updateCity(localStorage.getItem('city')).then(data=>{
            updateUI(data);
        }).catch(e=> console.log(e));
    }
}


cityForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    //get the city
    const city = cityForm.city.value.trim();
    cityForm.reset();
    localStorage.clear();
    //storing the city in the local storage
    localStorage.setItem('city',city);
    //update the UI with new city
    forecast.updateCity(city).then(data=>{
        updateUI(data);
    }).catch(e=> console.log(e));
});


checker();