// Changed the script to use a class insted of seperate functions and parameters.

class Forecast {
    constructor() {
        this.key = "NpSHQ6OA8ztki0iAkF89y5KmHsGGRAga";
        this.weatherURI = "https://dataservice.accuweather.com/currentconditions/v1/";
        this.cityURI = "https://dataservice.accuweather.com/locations/v1/cities/search"
    }

    async updateCity(city) {
        const cityDets = await this.getCity(city);
        const weather = await this.getWeather(cityDets.Key);
    
        // bruger object shorthand notation. JS antager at key og value har samme
        // så behøver ikke skrive begge
        return { cityDets, weather };
    }

    // get city information
    async getCity(city) {

        const query = `?apikey=${this.key}&q=${city}`;
    
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
    
        // take the first index which matches the search best
        return data[0];
    }

    // get weather information

    async getWeather(id) {
        
        const query = `${id}?apikey=${this.key}`;
    
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
    
        return data[0];
    }
}



