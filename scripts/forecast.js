class Forecast{
    constructor(){
        this.key = 'SJjylG4m8rVANhCkf8ViewfGLeGeOZKB';
        this.baseURLCity = 'https://dataservice.accuweather.com/locations/v1/cities/search'
        this.baseURLWeather = 'https://dataservice.accuweather.com/currentconditions/v1/'
    }
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`
        const response = await fetch(this.baseURLCity+query);
        const data = await response.json();
        
        return data[0];
    }
    async getWeather(cityCode){
        const query = `${cityCode}?apikey=${this.key}`;
        const response = await fetch(this.baseURLWeather+query);
        const data = await response.json();
        return data;
    }
    async updateCity(city){
        // console.log(city);
        const cityDets = await this.getCity(city);
        const weather = await this.getWeather(cityDets.Key);
        return {
            cityDets: cityDets,
            weather: weather
        };
    }
}

