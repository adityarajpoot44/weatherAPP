
import { weatherimg,coverimg } from '../../assest/img';

export function Air(num) {
    switch (num) {
        case 1:
            return "Good";
        case 2:
            return "Fair";
        case 3:
            return "Moderate";
        case 4:
            return "Poor";
        case 5:
            return "Very Poor";
        default:
            return "Moderate";
    }
}

export function getDirection(angle) {
    let directions = ["N", "NNE", "NE", "ENE", "E",
        "ESE", "SE", "SSE", "S",
        "SSW", "SW", "WSW", "W",
        "WNW", "NW", "NNW"];
    let section = parseInt(angle / 22.5 + 0.5);
    section = section % 16;

    return directions[section];
}

export function backcoverImg(apidata){
    switch (apidata) {
        case "Clear":
            return coverimg["snow"];
        case "Clouds":
            return coverimg["cloud"];
        case "scattered clouds":
            return coverimg["cloud"];
        case "Shower rain":
            return coverimg["rain"];
        case "Rain":
            return coverimg["rain"];
        case "Thunderstorm":
            return coverimg["thundercover"];
        case "Snow":
            return coverimg["snow"];
        case "Haze":
            return coverimg["haze"];
        case "Fog":
            return coverimg["fog"];
        case "Mist":
            return coverimg["fog"];
       default:
            return coverimg["fog"];
    }
}
export function WeImg(main) {
    switch (main) {
        case "Clear":
            return weatherimg["sun"];
        case "Clouds":
            return weatherimg["sun_cloud"];
        case "scattered clouds":
            return weatherimg["cloud"];
        case "Shower rain":
            return weatherimg["sun_cloudrain"];
        case "Rain":
            return weatherimg["rain_rain"];
        case "Thunderstorm":
            return weatherimg["thunder"];
        case "Snow":
            return weatherimg["snowflake"];
        case "Haze":
            return weatherimg["mist"];
        case "Fog":
            return weatherimg["mist"];
        case "Mist":
            return weatherimg["mist"];
       default:
            return weatherimg["mist"];
    }

}

export function Threshold(temp) {
    const value=15
    if(temp===value){
        return true
    }
    return false

}

// export function validatecity(city){

   
//         axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=59ccdc0e6d25ad5bc6cd8d162304dbed`)
//         .then((response)=>(
            
//         ))
    
// }